class RefreshToken {
  constructor(payload) {
    this._verifyPayload(payload)

    this.refreshToken = payload.refreshToken
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_TOKEN.NOT_MEET_CORRECT_DATA_TYPE')
    }
  }
}

module.exports = RefreshToken
