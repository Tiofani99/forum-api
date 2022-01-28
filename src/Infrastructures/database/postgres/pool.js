/* istanbul ignore file */
const { Pool } = require('pg')

const testConfig = {
  host: process.env.PGHOST_TEST,
  user: process.env.PGUSER_TEST,
  database: process.env.PGDATABASE_TEST,
  port: process.env.PGPORT_TEST,
  password: process.env.PGPASSWORD_TEST,
}

const pool = process.env.NODE_ENV === 'test' ? new Pool(testConfig) : new Pool()

module.exports = pool
