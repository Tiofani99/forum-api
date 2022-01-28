const ClientError = require('../ClientError')
const AuthenticationError = require('../AuthenticationError')

describe('AuthorizaitonError', () => {
  it('Should instanceof CLientError', () => {
    // Arrange
    const authorizationError = new AuthenticationError('')

    // Assert
    expect(authorizationError).toBeInstanceOf(ClientError)
  })

  it('Should create an error correctly', () => {
    // Arrange
    const authorizationError = new AuthenticationError('an error occured')

    // Assert
    expect(authorizationError.name).toEqual('AuthenticationError')
    expect(authorizationError.statusCode).toEqual(401)
    expect(authorizationError.message).toEqual('an error occured')
  })
})
