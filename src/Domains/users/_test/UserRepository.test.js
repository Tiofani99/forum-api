const UserRepository = require('../UserRepository')

describe('UserRepository', () => {
  it('Should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new UserRepository()

    // Assert
    await expect(() => userRepository.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(() => userRepository.verifyAvailableUsername({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(() => userRepository.findUserByUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
