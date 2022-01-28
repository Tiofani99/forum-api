/** instanbul ignore file */

const pool = require('../../../src/Infrastructures/database/postgres/pool')

const AuthenticationsTableTestHelper = {
  async storeRefreshToken(refreshToken) {
    const query = {
      text: 'INSERT INTO authentications (token) VALUES ($1)',
      values: [refreshToken],
    }

    await pool.query(query)
  },

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [refreshToken],
    }

    const result = await pool.query(query)

    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM authentications')
  },
}

module.exports = AuthenticationsTableTestHelper
