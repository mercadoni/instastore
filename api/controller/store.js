/**
 * Module to process store orders
 */
const Store = require('../model/store')
const Order = require('../model/order')
const LocationService = require('../service/location')

const findClosest = async (req, res) => {
  try {
    var destination = req.body
    var minETA = Number.MAX_VALUE
    var closestStore = null
    // if the destination does not have coordinates, we use geocoding to find them
    if (!('longitude' in destination && 'latitude' in destination)) {
      destination = await LocationService.geocoding(destination)
    }

    for await (const origin of Store.findOne()) {
      const shippingTime = await LocationService.calculateShippingDuration(origin, destination)

      if (!origin.nextDeliveryTime || origin.nextDeliveryTime < Date.now()) {
        origin.nextDeliveryTime = Date.now()
      }

      const eta = origin.nextDeliveryTime.getTime() + shippingTime

      if (eta < minETA) {
        minETA = eta
        closestStore = origin
      }
    }

    closestStore.nextDeliveryTime = new Date(closestStore.nextDeliveryTime.getTime() + (20 * 60 * 1000))

    // Update order with the closest store
    const ord = await Order.findOne({ _id: req.order })
    ord.store = closestStore._id
    ord.nextDeliveryTime = closestStore.nextDeliveryTime

    await closestStore.save()
    await ord.save()

    return res.status(200).json({
      storeId: closestStore.code,
      storeName: closestStore.name,
      isOpen: true,
      coordinates: { latitude: closestStore.latitude, longitude: closestStore.longitude },
      nextDeliveryTime: closestStore.nextDeliveryTime,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send('It was not possible to place the order, please try again later')
  }
}

module.exports = {
  findClosest,
}
