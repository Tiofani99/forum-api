const InvariantError = require('../../../Commons/exceptions/InvariantError')
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository')

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  constructor(pool) {
    super()

    this._pool = pool
  }

  async storeRefreshToken(refreshToken) {
    const query = {
      text: 'INSERT INTO authentications (token) VALUES ($1) RETURNING token',
      values: [refreshToken],
    }

    const result = await this._pool.query(query)

    return result.rows
  }

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [refreshToken],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('refresh token tidak ditemukan di database')
    }
  }

  async deleteRefreshToken(refreshToken) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [refreshToken],
    }

    await this._pool.query(query)
  }
}

module.exports = AuthenticationRepositoryPostgres
