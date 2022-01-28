const RegisteredUser = require('../RegisteredUser')

describe('RegisteredUser', () => {
  it('Should throw error when did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      username: 'miku',
    }

    // Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when payload does not give correct data type', () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      username: 123,
      fullname: 'Hatsune Miku',
    }

    // Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create RegisteredUser correctly', () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      username: 'miku',
      fullname: 'Hatsune Miku',
    }
    const { id, username, fullname } = new RegisteredUser(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(fullname).toEqual(payload.fullname)
  })
})
