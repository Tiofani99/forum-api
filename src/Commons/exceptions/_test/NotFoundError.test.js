const ClientError = require('../ClientError')
const NotFoundError = require('../NotFoundError')

describe('NotFoundError', () => {
  it('Should instanceof ClientError', () => {
    // Arrange
    const notFoundError = new NotFoundError('')

    // Assert
    expect(notFoundError).toBeInstanceOf(ClientError)
  })

  it('Should create an error correctly', () => {
    // Arrange
    const notFoundError = new NotFoundError('an error occured')

    // Assert
    expect(notFoundError.statusCode).toEqual(404)
    expect(notFoundError.message).toEqual('an error occured')
    expect(notFoundError.name).toEqual('NotFoundError')
  })
})
