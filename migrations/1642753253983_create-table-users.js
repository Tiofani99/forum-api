/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
    },
    fullname: {
      type: 'VARCHAR(100)',
    },
    password: {
      type: 'TEXT',
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
