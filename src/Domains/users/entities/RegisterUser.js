class RegisterUser {
  constructor({ username, fullname, password }) {
    this._verifyPayload({ username, fullname, password })

    this.username = username
    this.fullname = fullname
    this.password = password
  }

  _verifyPayload({ username, fullname, password }) {
    if (!username || !fullname || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof username !== 'string' || typeof fullname !== 'string' || typeof password !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_CORRECT_DATA_TYPE')
    }
    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
    }
    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHARS')
    }
    if (password.length < 6) {
      throw new Error('REGISTER_USER.PASSWORD_MINIMUM_CHARS')
    }
  }
}

module.exports = RegisterUser
