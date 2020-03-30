/**
 * Test Module for auth service
 */

const AuthService = require('../../service/auth')
const httpMocks = require('node-mocks-http')

describe('Auth service', () => {
  it('should return http status 403 for a request without authorization header', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/store',
      headers: {
        authorization: '',
      },
    })
    const response = httpMocks.createResponse()
    AuthService.verifyToken(request, response)
    expect(response.statusCode).toBe(401)
  })

  it('should set the user for a request with valid token', async () => {
    const user = { id: '123' }
    const token = AuthService.issue(user)
    const mockMiddleware = jest.fn()
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/store',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const response = httpMocks.createResponse()
    await AuthService.verifyToken(request, response, mockMiddleware)
    expect(mockMiddleware).toHaveBeenCalled()
    expect(request.user).toBe(user.id)
  })

  it('should return http status 403 for a request with invalid token', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/store',
      headers: {
        authorization: 'Bearer sdf45sd4fsd654fs65d',
      },
    })
    const response = httpMocks.createResponse()
    AuthService.verifyToken(request, response)
    expect(response.statusCode).toBe(403)
  })
})
