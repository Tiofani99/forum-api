const RegisterUser = require('../../Domains/users/entities/RegisterUser')

class UserUseCase {
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository
    this._passwordHash = passwordHash
  }

  async addUser(payload) {
    const registerUser = new RegisterUser(payload)
    await this._userRepository.verifyAvailableUsername(registerUser.username)
    registerUser.password = await this._passwordHash.hash(registerUser.password)
    const registeredUser = await this._userRepository.addUser(registerUser)

    return registeredUser
  }
}

module.exports = UserUseCase
