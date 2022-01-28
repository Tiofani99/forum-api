const Login = require('../../Domains/authentications/entitites/Login')
const LoggedIn = require('../../Domains/authentications/entitites/LoggedIn')
const RefreshToken = require('../../Domains/authentications/entitites/RefreshToken')
const RefreshedToken = require('../../Domains/authentications/entitites/RefreshedToken')
const Logout = require('../../Domains/authentications/entitites/Logout')

class AuthenticationUseCase {
  constructor({
    passwordHash, userRepository, authTokenManager, authenticationRepository,
  }) {
    this._passwordHash = passwordHash
    this._userRepository = userRepository
    this._authTokenManager = authTokenManager
    this._authenticationRepository = authenticationRepository
  }

  async login(payload) {
    const login = new Login(payload)
    const { id, username, password: encryptedPassword } = await this._userRepository
      .findUserByUsername(login.username)
    await this._passwordHash.compare(login.password, encryptedPassword)
    const accessToken = await this._authTokenManager.generateAccessToken({
      userId: id,
      username,
    })
    const refreshToken = await this._authTokenManager.generateRefreshToken({
      userId: id,
      username,
    })
    await this._authenticationRepository.storeRefreshToken(refreshToken)

    return new LoggedIn({
      accessToken,
      refreshToken,
    })
  }

  async refreshToken(payload) {
    const { refreshToken } = new RefreshToken(payload)
    await this._authTokenManager.verifyRefreshToken(refreshToken)
    await this._authenticationRepository.verifyRefreshToken(refreshToken)
    const { userId, username } = await this._authTokenManager.decodePayload(refreshToken)
    const accessToken = await this._authTokenManager.generateAccessToken({ userId, username })

    return new RefreshedToken({
      accessToken,
    })
  }

  async logout(payload) {
    const { refreshToken } = new Logout(payload)
    await this._authenticationRepository.verifyRefreshToken(refreshToken)
    await this._authTokenManager.verifyRefreshToken(refreshToken)
    await this._authenticationRepository.deleteRefreshToken(refreshToken)
  }
}

module.exports = AuthenticationUseCase
