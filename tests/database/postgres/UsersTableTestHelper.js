/* istanbul ignore file */
const pool = require('../../../src/Infrastructures/database/postgres/pool')

const UsersTableTestHelper = {
  async addUser({
    id = 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
    username = 'miku',
    fullname = 'Hatsune Miku',
    password = 'password',
  }) {
    const query = {
      text: 'INSERT INTO users (id, username, fullname, password) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, fullname, password],
    }

    const result = await pool.query(query)

    return result.rows[0]
  },

  async findUserById(id = 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c') {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    }

    const result = await pool.query(query)

    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM users')
  },
}

module.exports = UsersTableTestHelper
