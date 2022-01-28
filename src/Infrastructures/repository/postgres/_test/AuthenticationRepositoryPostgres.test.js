const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres')
const AuthenticationRepository = require('../../../../Domains/authentications/AuthenticationRepository')
const AuthenticationsTableTestHelper = require('../../../../../tests/database/postgres/AuthenticationsTableTestHelper')
const pool = require('../../../database/postgres/pool')
const InvariantError = require('../../../../Commons/exceptions/InvariantError')

describe('AuthenticationRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable()
  })

  it('Should be instanceof AuthenticationRepository', () => {
    // Arrange
    const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres({})

    // Assert
    expect(authenticationRepositoryPostgres).toBeInstanceOf(AuthenticationRepository)
  })

  describe('A store RefreshToken function', () => {
    it('Should store refreshToken into database', async () => {
      // Arrange
      const refreshToken = 'refresh_token'
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)

      // Action
      await authenticationRepositoryPostgres.storeRefreshToken(refreshToken)

      // Assert
      const token = await AuthenticationsTableTestHelper.verifyRefreshToken(refreshToken)
      expect(token).toHaveLength(1)
    })
  })

  describe('A verifyRefreshToken function', () => {
    it('Should throw InvariantError when refreshToken not available', async () => {
      // Arrange
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)

      // Assert
      await expect(authenticationRepositoryPostgres.verifyRefreshToken('refresh_token'))
        .rejects.toThrowError(InvariantError)
    })

    it('Should not throw InvariantError when refreshToken available', async () => {
    // Arrange
      const refreshToken = 'refresh_token'
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)
      await AuthenticationsTableTestHelper.storeRefreshToken(refreshToken)

      // Assert
      await expect(authenticationRepositoryPostgres.verifyRefreshToken(refreshToken))
        .resolves.not.toThrowError(InvariantError)
    })
  })

  describe('A deleteRefreshToken function', () => {
    it('Should persist delete refreshToken', async () => {
      // Arrange
      const refreshToken = 'refresh_token'
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)
      await AuthenticationsTableTestHelper.storeRefreshToken(refreshToken)

      // Action
      await authenticationRepositoryPostgres.deleteRefreshToken(refreshToken)

      // Assert
      await expect(AuthenticationsTableTestHelper.verifyRefreshToken(refreshToken))
        .resolves.toHaveLength(0)
    })
  })
})
