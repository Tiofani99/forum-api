class RefreshedToken {
  constructor(payload) {
    this._verifyPayload(payload)

    this.accessToken = payload.accessToken
  }

  _verifyPayload({ accessToken }) {
    if (!accessToken) {
      throw new Error('REFRESHED_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof accessToken !== 'string') {
      throw new Error('REFRESHED_TOKEN.NOT_MEET_CORRECT_DATA_TYPE')
    }
  }
}

module.exports = RefreshedToken
