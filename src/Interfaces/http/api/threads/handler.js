const ThreadUseCase = require('../../../../Applications/use_case/ThreadUseCase')

class ThreadsHandler {
  constructor(container) {
    this._container = container

    this.postThreadHandler = this.postThreadHandler.bind(this)
  }

  async postThreadHandler(request, h) {
    const { userId } = request.auth.credentials
    const threadUseCase = this._container.getInstance(ThreadUseCase.name)
    const addedThread = await threadUseCase.addThread(userId, request.payload)

    return h.response({
      status: 'success',
      data: {
        addedThread,
      },
    }).code(201)
  }
}

module.exports = ThreadsHandler
