class AuthTokenManager {
  async generateAccessToken(payload) {
    throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async generateRefreshToken(payload) {
    throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async verifyRefreshToken(refreshToken) {
    throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }

  async decodePayload(accessToken) {
    throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
  }
}

module.exports = AuthTokenManager
