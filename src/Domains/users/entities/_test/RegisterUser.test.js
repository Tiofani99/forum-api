const RegisterUser = require('../RegisterUser')

describe('RegisterUser entities', () => {
  it('Should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'miku',
      fullname: 'Hatsune Miku',
    }

    // Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should trhow error when payload does not give the correct data type', () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: 'Hatsune Miku',
      password: 'password',
    }

    // Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should throw error when username contain restricted character', () => {
    // Arrange
    const payload = {
      username: 'hatsune miku',
      fullname: 'Hatsune Miku',
      password: 'password',
    }

    // Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('Should throw error when username is more than 50 characters', () => {
    // Arrange
    const payload = {
      username: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyyuiipo',
      fullname: 'Hatsune Miku',
      password: 'password',
    }

    // Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHARS')
  })

  it('Should throw error when password less than 6 characters', () => {
    // Arrange
    const payload = {
      username: 'miku',
      fullname: 'Hatsune Miku',
      password: '123',
    }

    // Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.PASSWORD_MINIMUM_CHARS')
  })

  it('Should create RegisterUser correctly', () => {
    // Arrange
    const payload = {
      username: 'miku',
      fullname: 'Hatsune Miku',
      password: 'password',
    }
    const { username, fullname, password } = new RegisterUser(payload)

    // Assert
    expect(username).toEqual(payload.username)
    expect(fullname).toEqual(payload.fullname)
    expect(password).toEqual(payload.password)
  })
})
