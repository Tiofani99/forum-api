const AuthTokenManager = require('../AuthTokenManager')

describe('AuthTokenManager', () => {
  it('Should throw error when invoke abstract behavior', async () => {
    // Arrange
    const authTokenManager = new AuthTokenManager()

    // Assert
    await expect(() => authTokenManager.generateAccessToken({})).rejects.toThrowError('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    await expect(() => authTokenManager.generateRefreshToken({})).rejects.toThrowError('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    await expect(() => authTokenManager.verifyRefreshToken('')).rejects.toThrowError('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    await expect(() => authTokenManager.decodePayload('')).rejects.toThrowError('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  })
})
