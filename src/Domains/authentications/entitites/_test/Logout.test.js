const Logout = require('../Logout')

describe('Logout', () => {
  it('Should throw error when not contain needed property', () => {
    // Arrange
    const payload = {}

    // Assert
    expect(() => new Logout(payload)).toThrowError('LOGOUT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when not meet correct data type', () => {
    // Arrange
    const payload = {
      refreshToken: 123,
    }

    // Assert
    expect(() => new Logout(payload)).toThrowError('LOGOUT.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create Logout correctly', () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    }

    // Action
    const loggout = new Logout(payload)

    // Assert
    expect(loggout.refreshToken).toEqual(payload.refreshToken)
  })
})
