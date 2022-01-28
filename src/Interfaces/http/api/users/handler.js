const UserUseCase = require('../../../../Applications/use_case/UserUseCase')

class UsersHandler {
  constructor(container) {
    this._container = container

    this.postUserHandler = this.postUserHandler.bind(this)
  }

  async postUserHandler(request, h) {
    const userUseCase = this._container.getInstance(UserUseCase.name)
    const addedUser = await userUseCase.addUser(request.payload)

    return h.response({
      status: 'success',
      data: {
        addedUser,
      },
    }).code(201)
  }
}

module.exports = UsersHandler
