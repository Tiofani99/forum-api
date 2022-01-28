const PasswordHash = require('../PasswordHash')

describe('PasswordHash Abstract', () => {
  it('Should throw error when invoke abstract behavior', async () => {
    // Arrange
    const passwordHash = new PasswordHash()

    // Assert
    await expect(() => passwordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED')
    await expect(() => passwordHash.compare('dummy_password', 'encrypted_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED')
  })
})
