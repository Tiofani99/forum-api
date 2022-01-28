const AuthenticationUseCase = require('../AuthenticationUseCase')
const Login = require('../../../Domains/authentications/entitites/Login')
const Logout = require('../../../Domains/authentications/entitites/Logout')
const LoggedIn = require('../../../Domains/authentications/entitites/LoggedIn')
const RefreshToken = require('../../../Domains/authentications/entitites/RefreshToken')
const RefreshedToken = require('../../../Domains/authentications/entitites/RefreshedToken')
const UserRepository = require('../../../Domains/users/UserRepository')
const PasswordHash = require('../../security/PasswordHash')
const AuthTokenManager = require('../../security/AuthTokenManager')
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository')

jest.mock('../../../Domains/authentications/entitites/Login', () => jest.fn().mockImplementation(() => ({
  username: 'miku',
  password: 'password',
})))
jest.mock('../../../Domains/authentications/entitites/RefreshToken', () => jest.fn().mockImplementation(() => ({
  refreshToken: 'refresh_token',
})))
jest.mock('../../../Domains/authentications/entitites/Logout', () => jest.fn().mockImplementation(() => ({
  refreshToken: 'refresh_token',
})))

describe('AuthenticationUseCase', () => {
  describe('A Login function', () => {
    it('Shold orchestrate login correctly', async () => {
      // Arrange
      const payload = {
        username: 'miku',
        password: 'password',
      }

      const mockUserRepository = new UserRepository()
      const mockPasswordHash = new PasswordHash()
      const mockAuthTokenManager = new AuthTokenManager()
      const mockAuthenticationRepository = new AuthenticationRepository()

      /** mocking needed function */
      mockUserRepository.findUserByUsername = jest.fn()
        .mockImplementation(() => Promise.resolve({
          id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
          username: 'miku',
          fullname: 'Hatsune Miku',
          password: 'encrypted_password',
        }))
      mockPasswordHash.compare = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthTokenManager.generateAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve('access_token'))
      mockAuthTokenManager.generateRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve('refresh_token'))
      mockAuthenticationRepository.storeRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())

      /** creating use case instance */
      const authenticationUseCase = new AuthenticationUseCase({
        passwordHash: mockPasswordHash,
        authTokenManager: mockAuthTokenManager,
        userRepository: mockUserRepository,
        authenticationRepository: mockAuthenticationRepository,
      })

      // Action
      const logged = await authenticationUseCase.login(payload)

      // Assert
      expect(Login).toBeCalledTimes(1)
      expect(mockUserRepository.findUserByUsername).toBeCalledWith(payload.username)
      expect(mockPasswordHash.compare).toBeCalledWith(payload.password, 'encrypted_password')
      expect(mockAuthTokenManager.generateAccessToken).toBeCalledWith({
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      })
      expect(mockAuthTokenManager.generateRefreshToken).toBeCalledWith({
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      })
      expect(logged).toStrictEqual(new LoggedIn({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      }))
    })
  })

  describe('A refreshToken function', () => {
    it('Should orchestrate refreshToken correctly', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      }
      const mockAuthenticationRepository = new AuthenticationRepository()
      const mockAuthTokenManager = new AuthTokenManager()

      /** mocking needed function */
      mockAuthenticationRepository.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthTokenManager.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthTokenManager.decodePayload = jest.fn()
        .mockImplementation(() => Promise.resolve({
          userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
          username: 'miku',
        }))
      mockAuthTokenManager.generateAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve('access_token'))

      /** creating use case instance */
      const authenticationUseCase = new AuthenticationUseCase({
        authTokenManager: mockAuthTokenManager,
        authenticationRepository: mockAuthenticationRepository,
      })

      // Action
      const refreshedToken = await authenticationUseCase.refreshToken(payload)

      // Assert
      expect(RefreshToken).toBeCalledTimes(1)
      expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(payload.refreshToken)
      expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(payload.refreshToken)
      expect(mockAuthTokenManager.decodePayload).toBeCalledWith(payload.refreshToken)
      expect(mockAuthTokenManager.generateAccessToken).toBeCalledWith({
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      })
      expect(refreshedToken).toStrictEqual(new RefreshedToken({
        accessToken: 'access_token',
      }))
    })
  })

  describe('A logout function', () => {
    it('Should orchestrate logout function correctly', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      }

      const mockAuthTokenManager = new AuthTokenManager()
      const mockAuthenticationRepository = new AuthenticationRepository()

      /** mocking needed function */
      mockAuthTokenManager.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthenticationRepository.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthenticationRepository.deleteRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())

      const authenticationUseCase = new AuthenticationUseCase({
        authenticationRepository: mockAuthenticationRepository,
        authTokenManager: mockAuthTokenManager,
      })

      // Action
      await authenticationUseCase.logout(payload)

      // Assert
      expect(Logout).toBeCalledTimes(1)
      expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(payload.refreshToken)
      expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(payload.refreshToken)
      expect(mockAuthenticationRepository.deleteRefreshToken).toBeCalledWith(payload.refreshToken)
    })
  })
})
