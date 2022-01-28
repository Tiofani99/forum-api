class Login {
  constructor(payload) {
    this._verifyPayload(payload)

    this.username = payload.username
    this.password = payload.password
  }

  _verifyPayload({ username, password }) {
    if (!username || !password) {
      throw new Error('PERFORM_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('PERFORM_LOGIN.NOT_MEET_CORRECT_DATA_TYPE')
    }
    if (!username.match(/^[\w]+$/)) {
      throw new Error('PERFORM_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
    }
    if (username.length > 50) {
      throw new Error('PERFORM_LOGIN.USERNAME_LIMIT_CHARS')
    }
  }
}

module.exports = Login
