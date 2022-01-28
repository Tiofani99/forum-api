const InvariantError = require('../InvariantError')
const ClientError = require('../ClientError')

describe('InvariantError', () => {
  it('Should create an error correctly', () => {
    // Arrange
    const invariantError = new InvariantError('an error occured')

    // Assert
    // expect(invariantError).toBeInstanceOf(ClientError)
    expect(invariantError.name).toEqual('InvariantError')
    expect(invariantError.statusCode).toEqual(400)
    expect(invariantError.message).toEqual('an error occured')
  })

  it('Should instanceof ClientError', () => {
    // Arrange
    const invariantError = new InvariantError('an error occured')

    // Assert
    expect(invariantError).toBeInstanceOf(ClientError)
  })
})
