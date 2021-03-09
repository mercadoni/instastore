'use strict'

const RATIO = 180
const MID_RATIO = 60
const DIS_MULTIPLIER = 1.609344
const DIS_MULTIPLIER_RATIO = 1.1515

function isLatitude (lat) {
  return lat && isFinite(lat) && Math.abs(lat) <= 90
}

function isLongitude (lon) {
  return lon && isFinite(lon) && Math.abs(lon) <= 180
}

function getDistanceBetweenTwoPoints (firstLat, firstLon, secondLat, secondLon) {
  if (firstLat === secondLat && firstLon === secondLon) {
    return 0
  }

  const radlat1 = Math.PI * firstLat / 180
  const radlat2 = Math.PI * secondLat / 180

  const theta = firstLon - secondLon
  const radtheta = Math.PI * theta / 180

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = dist * RATIO / Math.PI
  dist = dist * MID_RATIO * DIS_MULTIPLIER_RATIO
  dist = dist * DIS_MULTIPLIER

  return dist
}

function getCloseDistanceFromOnePoint(currentLat, currentLon, stores) {
  const closestStore = stores
    .filter(({ coordinates }) => coordinates.lon && coordinates.lat)
    .map(store => {
      const distance = getDistanceBetweenTwoPoints(
        currentLat,
        currentLon,
        store.coordinates.lat,
        store.coordinates.lon
      )

      return {
        store,
        distance
      }
    })
    .reduce((acc, store) => (acc.distance < store.distance ? acc : store))

  return closestStore
}

module.exports = {
  validate: {
    isLatitude,
    isLongitude
  },
  getCloseDistanceFromOnePoint
}
