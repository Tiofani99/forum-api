const AuthenticationRepository = require('../AuthenticationRepository')

describe('AuthenticationRepository', () => {
  it('Should throw error when invoke abstract class behavior', async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository()

    // Assert
    await expect(authenticationRepository.storeRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(authenticationRepository.verifyRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(authenticationRepository.deleteRefreshToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
