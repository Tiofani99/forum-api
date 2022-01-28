class Logout {
  constructor(payload) {
    this._verifryPayload(payload)

    this.refreshToken = payload.refreshToken
  }

  _verifryPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('LOGOUT.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof refreshToken !== 'string') {
      throw new Error('LOGOUT.NOT_MEET_CORRECT_DATA_TYPE')
    }
  }
}

module.exports = Logout
