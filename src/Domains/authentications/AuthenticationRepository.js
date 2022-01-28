class AuthenticationRepository {
  async storeRefreshToken(refreshToken) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyRefreshToken(refreshToken) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async deleteRefreshToken(accessToken) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

module.exports = AuthenticationRepository
