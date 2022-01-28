const CreatedThread = require('../../../Domains/threads/entities/CreatedThread')

class ThreadRepositoryPostgres {
  constructor(pool, idGenerator) {
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addThread({ title, body, owner }) {
    const id = this._idGenerator()
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, created_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, owner',
      values: [id, title, body, owner, createdAt, updatedAt],
    }

    const result = await this._pool.query(query)

    return new CreatedThread({ ...result.rows[0] })
  }
}

module.exports = ThreadRepositoryPostgres
