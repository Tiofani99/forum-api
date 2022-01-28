const PerformedLogin = require('../LoggedIn')

describe('PerformedLogin', () => {
  it('Should throw error when did not contain needed property', () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    }

    // Assert
    expect(() => new PerformedLogin(payload)).toThrowError('PERFORMED_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when did not meet correct data type', () => {
    // Arrange
    const payload = {
      accessToken: 123,
      refreshToken: 'refresh_token',
    }

    // Assert
    expect(() => new PerformedLogin(payload)).toThrowError('PERFORMED_LOGIN.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create PerformedLogin correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    }

    // Action
    const performedLogin = new PerformedLogin(payload)

    // Assert
    expect(performedLogin.accessToken).toEqual(payload.accessToken)
    expect(performedLogin.refreshToken).toEqual(payload.refreshToken)
  })
})
