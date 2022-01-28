const UserUseCase = require('../UserUseCase')
const UserRepository = require('../../../Domains/users/UserRepository')
const PasswordHash = require('../../security/PasswordHash')
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser')
const RegisterUser = require('../../../Domains/users/entities/RegisterUser')

describe('UsersUseCase', () => {
  it('Should orchestracte add user action correctly', async () => {
    // Arrange
    const payload = {
      username: 'miku',
      fullname: 'Hatsune Miku',
      password: 'password',
    }
    const expectedRegisteredUser = new RegisteredUser({
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      username: payload.username,
      fullname: payload.fullname,
    })

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository()
    const mockPasswordHash = new PasswordHash()

    /** mocking needed function */
    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredUser))
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'))

    /** creating use case instance */
    const userUseCase = new UserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    })

    // Action
    const registeredUser = await userUseCase.addUser(payload)

    // Assert
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(payload.username)
    expect(mockPasswordHash.hash).toBeCalledWith(payload.password)
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: payload.username,
      password: 'encrypted_password',
      fullname: payload.fullname,
    }))
    expect(registeredUser).toStrictEqual(expectedRegisteredUser)
  })
})
