/**
 * Test module for store endpoint
 */

const dbService = require('../../service/db')
const request = require('supertest')
const app = require('../../../app')
const jwt = require('jsonwebtoken')
const Order = require('../../model/order')

jest.mock('jsonwebtoken')

beforeAll(async () => {
  await dbService.connectDB()
  await dbService.removeAllFromCollection('orders')
  await dbService.fillDB()
})

const destination = {
  name: 'Casa',
  address: 'Gustavo A. Madero Oriente 223',
  address_two: 'apt 205',
  description: 'knock 3 times',
  country: 'México',
  city: 'Monterrey',
  state: 'N.L.',
  zip_code: '64570',
  latitude: 25.691053,
  longitude: -100.310530,
}

describe('Store endpoint', () => {
  it('does not allow orders with invalid auth token', async () => {
    const res = await request(app)
      .post('/store/order')
      .set('Authorization', 'bearer ' + 'auth.token')
      .send(destination)

    expect(res.statusCode).toEqual(403)
  })

  it('should be able to place a new order', async () => {
    // mock jwt verification
    jwt.verify.mockResolvedValue({ id: 1 })

    const res = await request(app)
      .post('/store/order')
      .set('Authorization', 'bearer ' + 'auth.token')
      .send(destination)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('storeId')
    expect(res.body).toHaveProperty('storeName')
    expect(res.body).toHaveProperty('isOpen')
    expect(res.body).toHaveProperty('coordinates')
    expect(res.body).toHaveProperty('nextDeliveryTime')
  })

  it('should be able to place a order without coordinates', async () => {
    // mock jwt verification
    jwt.verify.mockResolvedValue({ id: 1 })

    var dest = destination
    delete dest.latitude
    delete dest.longitude

    const res = await request(app)
      .post('/store/order')
      .set('Authorization', 'bearer ' + 'auth.token')
      .send(dest)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('storeId')
  })
})

describe('Order track', () => {
  it('has 2 entries for the last set of valid calls to the store endpoint', async () => {
    const entries = await Order.countDocuments()

    expect(entries).toEqual(2)
  })
})

afterAll(async () => {
  await dbService.closeTestDB()
})
