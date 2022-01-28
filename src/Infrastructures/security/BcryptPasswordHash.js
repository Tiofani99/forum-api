const PasswordHash = require('../../Applications/security/PasswordHash')
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError')

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt) {
    super()

    this._bcrypt = bcrypt
  }

  async hash(password) {
    const result = await this._bcrypt.hash(password, 10)

    return result
  }

  async compare(plainPassword, encryptedPassword) {
    const match = await this._bcrypt.compare(plainPassword, encryptedPassword)

    if (!match) {
      throw new AuthenticationError('Password yang anda masukkan salah.')
    }
  }
}

module.exports = BcryptPasswordHash
