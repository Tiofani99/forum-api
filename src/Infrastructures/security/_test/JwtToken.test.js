const Jwt = require('@hapi/jwt')
const JwtToken = require('../JwtToken')
const AuthTokenManager = require('../../../Applications/security/AuthTokenManager')
const InvariantError = require('../../../Commons/exceptions/InvariantError')

describe('JwtToken', () => {
  it('Should be instanceof AuthTokenManager', () => {
    // Arrange
    const jwtToken = new JwtToken()

    // Assert
    expect(jwtToken).toBeInstanceOf(AuthTokenManager)
  })

  describe('A generateAccessToken function', () => {
    it('Should generate accessToken correctly', async () => {
      // Arrange
      const payload = {
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      }

      /** mocking */
      const mockTokenGenerate = {
        generate: jest.fn().mockImplementation(() => Promise.resolve('access_token')),
      }
      const jwtToken = new JwtToken(mockTokenGenerate)

      // Action
      const accessToken = await jwtToken.generateAccessToken(payload)

      // Assert
      expect(mockTokenGenerate.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY)
      expect(accessToken).toEqual('access_token')
    })
  })

  describe('A generateRefreshToken function', () => {
    it('Should generate refeshToken correctly', async () => {
      // Arrange
      const payload = {
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      }

      /** mocking */
      const mockTokenGenerate = {
        generate: jest.fn().mockImplementation(() => Promise.resolve('refresh_token')),
      }
      const jwtToken = new JwtToken(mockTokenGenerate)

      // Action
      const refreshToken = await jwtToken.generateRefreshToken(payload)

      // Assert
      expect(mockTokenGenerate.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY)
      expect(refreshToken).toEqual('refresh_token')
    })
  })

  describe('A verifyRefreshToken function', () => {
    it('Should throw InvariantError when verification failed', async () => {
      // Arrange
      const payload = {
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      }
      const jwtToken = new JwtToken(Jwt.token)
      const accessToken = await jwtToken.generateAccessToken(payload)

      // Assert
      await expect(jwtToken.verifyRefreshToken(accessToken)).rejects.toThrowError(InvariantError)
    })

    it('Should not throw InvariantError when verification success', async () => {
      // Arrange
      const payload = {
        userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
      }
      const jwtToken = new JwtToken(Jwt.token)
      const refreshToken = await jwtToken.generateRefreshToken(payload)

      // Assert
      await expect(jwtToken.verifyRefreshToken(refreshToken))
        .resolves.not.toThrowError(InvariantError)
    })
  })

  describe('A decode function', () => {
    it('Should decode token correctly', async () => {
      // Arrange
      const jwtToken = new JwtToken(Jwt.token)
      const accessToken = await jwtToken.generateAccessToken({ username: 'miku' })

      const spyDecode = jest.spyOn(Jwt.token, 'decode')

      // Action
      const { username } = await jwtToken.decodePayload(accessToken)

      // Assert
      expect(username).toEqual('miku')
      expect(spyDecode).toBeCalled()
    })
  })
})
