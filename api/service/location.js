/**
 * Provide coordinates and distances of locations
 */
const got = require('got')
const serverConfig = require('../../config')
const url = serverConfig.geocoding_url
const apiKey = serverConfig.geocoding_api_key

/**
 * Use LocationIQ to get coordinates of an address
 * https://locationiq.com/docs#forward-geocoding
 */
const geocoding = async (place) => {
  try {
    const searchParams = new URLSearchParams([
      ['key', apiKey],
      ['street', place.address],
      ['city', place.city],
      ['country', place.country],
      ['format', 'json'],
    ])

    var response = await got(`${url}search.php?`, { searchParams })
    response = JSON.parse(response.body)

    return { latitude: response[0].lat, longitude: response[0].lon }
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

const getShippingDuration = async (origin, destination) => {
  try {
    const coordinates = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`
    const searchParams = new URLSearchParams([
      ['sources', 0],
      ['destinations', 1],
      ['fallback_speed', 30], // If no route found, use this as speed
      ['annotations', 'duration'],
      ['generate_hints', 'false'],
      ['key', apiKey],
    ])

    var response = await got(`${url}matrix/driving/${coordinates}?`, { searchParams })
    response = JSON.parse(response.body)

    return response.durations[0][0]
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

module.exports = {
  geocoding,
  getShippingDuration,
}
