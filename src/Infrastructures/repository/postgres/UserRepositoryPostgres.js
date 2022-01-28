const InvariantError = require('../../../Commons/exceptions/InvariantError')
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser')
const UserRepository = require('../../../Domains/users/UserRepository')

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super()

    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addUser({ username, fullname, password }) {
    const id = this._idGenerator()
    const query = {
      text: 'INSERT INTO users (id, username, fullname, password) VALUES ($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, fullname, password],
    }

    const result = await this._pool.query(query)

    return new RegisteredUser({ ...result.rows[0] })
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    }
    const result = await this._pool.query(query)

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia')
    }
  }

  async findUserByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('username tidak ditemukan.')
    }

    return result.rows[0]
  }
}

module.exports = UserRepositoryPostgres
