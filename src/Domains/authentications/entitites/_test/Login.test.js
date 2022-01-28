const PerformLogin = require('../Login')

describe('PerformLogin entities', () => {
  it('Should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'miku',
    }

    // Assert
    expect(() => new PerformLogin(payload)).toThrowError('PERFORM_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when payload did not meet correct data type', () => {
    // Arrange
    const payload = {
      username: 123,
      password: 'password',
    }

    // Assert
    expect(() => new PerformLogin(payload)).toThrowError('PERFORM_LOGIN.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should throw error when username contain restricted character', () => {
    // Arrange
    const payload = {
      username: 'Hatsune Miku',
      password: 'password',
    }

    // Assert
    expect(() => new PerformLogin(payload)).toThrowError('PERFORM_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('Should throw error when username more than 50 characters', () => {
    // Arrange
    const payload = {
      username: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop',
      password: 'password',
    }

    // Assert
    expect(() => new PerformLogin(payload)).toThrowError('PERFORM_LOGIN.USERNAME_LIMIT_CHARS')
  })

  it('Should create PerformLogin correctly', () => {
    // Arrange
    const payload = {
      username: 'miku',
      password: 'password',
    }

    // Action
    const performLogin = new PerformLogin(payload)

    // Assert
    expect(performLogin.username).toEqual(payload.username)
    expect(performLogin.password).toEqual(payload.password)
  })
})
