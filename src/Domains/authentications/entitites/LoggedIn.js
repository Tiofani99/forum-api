class LoggedIn {
  constructor(payload) {
    this._verifyPayload(payload)

    this.accessToken = payload.accessToken
    this.refreshToken = payload.refreshToken
  }

  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error('PERFORMED_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('PERFORMED_LOGIN.NOT_MEET_CORRECT_DATA_TYPE')
    }
  }
}

module.exports = LoggedIn
