/**
 * Test module for user endpoint
 */

const { connectDB, closeTestDB } = require('../../service/db')
const request = require('supertest')
const app = require('../../../app')

beforeAll(async () => await connectDB())

const testUser = { username: 'test', password: 'pa$$w0rd' }

describe('User endpoint', () => {
  it('should be able to register a new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        username: testUser.username,
        password: testUser.password,
        password2: testUser.password,
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('token')
  })

  it('does not allow not matching passwords', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        username: testUser.username,
        password: testUser.password,
        password2: '5elasCrey0',
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toContain('Passwords don\'t match')
  })

  it('should allow login of registered users', async () => {
    const res = await request(app)
      .get('/user/login')
      .send({
        username: testUser.username,
        password: testUser.password,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('does not allow login of unregistered users', async () => {
    const res = await request(app)
      .get('/user/login')
      .send({
        username: 'sdfsdf',
        password: 'sdfsdfsdf',
      })
    expect(res.statusCode).toEqual(401)
  })

  it('does not allow to register user twice', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        username: testUser.username,
        password: testUser.password,
        password2: testUser.password,
      })
    expect(res.statusCode).toEqual(409)
    expect(res.body).toContain('User is already registered')
  })
})

afterAll(async () => {
  await closeTestDB()
})
