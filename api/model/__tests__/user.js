/**
 * Test module for User Model
 */

const { connectDB, closeTestDB } = require('../../service/db')
const User = require('../user')

beforeAll(async () => await connectDB())

const credentials = { username: 'test', password: 'pa$$w0rd' }

describe('User', () => {
  it('should be able to create a new user', async () => {
    const user = await User.create(credentials)
    expect(user).toBeTruthy()
    expect(user.username).toEqual(credentials.username)
  })

  it('does not allow duplicated usernames', async () => {
    await expect(User.create(credentials)).rejects.toThrowError('duplicate')
  })

  it('should be able to find an existing user by credentials', async () => {
    const user = await User.findByCredentials(credentials.username, credentials.password)
    expect(user).toBeTruthy()
    expect(user.username).toEqual(credentials.username)
  })

  it('does not find user by invalid credentials', async () => {
    await expect(User.findByCredentials('nouser', '1312323')).rejects.toThrowError('Invalid')
  })

  it('does not find user with wrong password', async () => {
    await expect(User.findByCredentials(credentials.username, '1312323')).rejects.toThrowError('Invalid')
  })

  it('should hash the password before saving', async () => {
    const user = await User.findByCredentials(credentials.username, credentials.password)
    expect(user).toBeTruthy()
    expect(user.password).not.toEqual(credentials.password)
  })
})

afterAll(async () => {
  await closeTestDB()
})
