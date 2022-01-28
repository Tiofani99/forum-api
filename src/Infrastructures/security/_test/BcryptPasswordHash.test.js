const bcrypt = require('bcrypt')
const BcryptPasswordHash = require('../BcryptPasswordHash')
const PasswordHash = require('../../../Applications/security/PasswordHash')
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError')

describe('BcryptPasswordHash', () => {
  it('Should to be instanceof PasswordHash', async () => {
    // Arrange
    const bcryptPasswordHash = new BcryptPasswordHash(bcrypt)

    // Assert
    expect(bcryptPasswordHash).toBeInstanceOf(PasswordHash)
  })

  describe('A hash function', () => {
    it('Should encrypt password correctly', async () => {
    // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt)
      const spyHash = jest.spyOn(bcrypt, 'hash')

      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('password', 10)

      // Assert
      expect(typeof encryptedPassword).toEqual('string')
      expect(spyHash).toBeCalledWith('password', 10)
      expect(encryptedPassword).not.toEqual('password')
    })
  })

  describe('A compare function', () => {
    it('Should throw AuthenticationError when password not matched', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt)
      const spyCompare = jest.spyOn(bcrypt, 'compare')

      // Assert
      await expect(bcryptPasswordHash.compare('plain_password', 'encrypted_password')).rejects.toThrowError(AuthenticationError)
      expect(spyCompare).toBeCalled()
    })

    it('Should not throw AuthenticationError when password matched', async () => {
      // Arrange
      const password = 'password'
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt)
      const encryptedPassword = await bcryptPasswordHash.hash(password)

      // Assert
      await expect(bcryptPasswordHash.compare(password, encryptedPassword))
        .resolves.not.toThrowError(AuthenticationError)
    })
  })
})
