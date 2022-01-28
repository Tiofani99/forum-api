const RefreshToken = require('../RefreshToken')

describe('RefreshToken', () => {
  it('Should contain needed property', () => {
    // Arrange
    const payload = {}

    // Assert
    expect(() => new RefreshToken(payload)).toThrowError('REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should meet correct daata type', () => {
    // Arrange
    const payload = {
      refreshToken: 123,
    }

    // Assert
    expect(() => new RefreshToken(payload)).toThrowError('REFRESH_TOKEN.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create RefreshToken correctly', () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    }

    // Action
    const refreshToken = new RefreshToken(payload)

    // Assert
    expect(refreshToken.refreshToken).toEqual(payload.refreshToken)
  })
})
