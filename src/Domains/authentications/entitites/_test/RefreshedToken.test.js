const RefreshedToken = require('../RefreshedToken')

describe('RefreshedToken', () => {
  it('Should contain needed property', () => {
    // Arrange
    const payload = {}

    // Assert
    expect(() => new RefreshedToken(payload)).toThrowError('REFRESHED_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should meet correct data type', () => {
    // Arrange
    const payload = {
      accessToken: 123,
    }

    // Assert
    expect(() => new RefreshedToken(payload)).toThrowError('REFRESHED_TOKEN.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create RefreshedToken correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'access_token',
    }

    // Action
    const refreshedToken = new RefreshedToken(payload)

    // Assert
    expect(refreshedToken.accessToken).toEqual(payload.accessToken)
  })
})
