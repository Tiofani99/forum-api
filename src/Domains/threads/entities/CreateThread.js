class CreateThread {
  constructor(payload) {
    this._verifryPayload(payload)

    this.title = payload.title
    this.body = payload.body
  }

  _verifryPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('CREATE_THREAD.NOT_MEET_CORRECT_DATA_TYPE')
    }
  }
}

module.exports = CreateThread
