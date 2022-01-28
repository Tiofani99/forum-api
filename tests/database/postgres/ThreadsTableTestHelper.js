/** instanbul ignore file */

const pool = require('../../../src/Infrastructures/database/postgres/pool')
const UsersTableTestHelper = require('./UsersTableTestHelper')

const ThreadsTableTestHelper = {
  async addThread({
    id = 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
    title = 'thread_title',
    body = 'thread_body',
  }) {
    // insert user
    const owner = await UsersTableTestHelper.addUser({ id: 'f0e0eb7e-9b43-49bb-af85-9aa28f79ad96' })

    const query = {
      text: 'INSERT INTO threads (id, title, body, owner) VALUES ($1, $2, $3, $4) RETURNING id, owner',
      values: [id, title, body, owner],
    }

    const result = await pool.query(query)

    return result.rows[0]
  },

  async findById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    }

    const result = await pool.query(query)

    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads')
  },
}

module.exports = ThreadsTableTestHelper
