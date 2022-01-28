const AuthTokenManager = require('../../Applications/security/AuthTokenManager')
const InvariantError = require('../../Commons/exceptions/InvariantError')

class JwtToken extends AuthTokenManager {
  constructor(jwt) {
    super()

    this._jwt = jwt
  }

  async generateAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY)
  }

  async generateRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY)
  }

  async verifyRefreshToken(refreshToken) {
    try {
      const artifacts = this._jwt.decode(refreshToken)
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
    } catch (err) {
      throw new InvariantError('refresh token tidak valid')
    }
  }

  async decodePayload(token) {
    const artifacts = this._jwt.decode(token)

    return artifacts.decoded.payload
  }
}

module.exports = JwtToken
