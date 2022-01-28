const AuthenticationUseCase = require('../../../../Applications/use_case/AuthenticationUseCase')

class AuthenticationsHandler {
  constructor(container) {
    this._container = container

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this)
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this)
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this)
  }

  async postAuthenticationHandler(request, h) {
    const authenticationUseCase = this._container.getInstance(AuthenticationUseCase.name)
    const { accessToken, refreshToken } = await authenticationUseCase.login(request.payload)

    return h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    }).code(201)
  }

  async putAuthenticationHandler(request, h) {
    const authenticationUseCase = this._container.getInstance(AuthenticationUseCase.name)
    const { accessToken } = await authenticationUseCase.refreshToken(request.payload)

    return h.response({
      status: 'success',
      data: {
        accessToken,
      },
    }).code(200)
  }

  async deleteAuthenticationHandler(request, h) {
    const authenticationUseCase = this._container.getInstance(AuthenticationUseCase.name)
    await authenticationUseCase.logout(request.payload)

    return h.response({
      status: 'success',
    }).code(200)
  }
}

module.exports = AuthenticationsHandler
