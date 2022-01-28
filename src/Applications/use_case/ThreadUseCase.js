const CreateThread = require('../../Domains/threads/entities/CreateThread')

class ThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository
  }

  async addThread(owner, payload) {
    const { title, body } = new CreateThread(payload)
    const createdThread = await this._threadRepository.addThread({ title, body, owner })

    return createdThread
  }
}

module.exports = ThreadUseCase
