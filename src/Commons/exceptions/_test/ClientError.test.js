const ClientError = require('../ClientError')

describe('ClientError', () => {
  it('Should throw error when directly using it', () => {
    // Assert
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class')
  })
})
