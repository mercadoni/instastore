/**
 * Test module for Location service
 */
const locationService = require('../location')

const testAddress = {
  name: 'tienda1',
  address: 'Ave. Paseo de los Leones No. 3399, Col. Cumbres',
  city: 'Monterrey',
  country: 'Mexico',
  latitude: 25.8322,
  longitude: -100.2978,
}

describe('location service', () => {
  it('should return the coordinates of an address', async () => {
    const coord = await locationService.geocoding(testAddress)
    expect(coord).toBeTruthy()
    expect(coord).toHaveProperty('latitude')
    expect(coord).toHaveProperty('longitude')
  })

  it('should return the duration of a shipping', async () => {
    var duration = await locationService.getShippingDuration(testAddress, testAddress)

    expect(duration).toEqual(0)

    duration = await locationService.getShippingDuration(
      testAddress,
      { longitude: -74.0760439, latitude: 4.59808 }) // Bogota coordinates

    expect(duration).toBeGreaterThan(100)
  })
})
