/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
    },
    body: {
      type: 'TEXT',
    },
    owner: {
      type: 'CHAR(36)',
    },
    created_at: {
      type: 'TEXT',
    },
    deleted_at: {
      type: 'TEXT',
    },
  })

  pgm.createConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE')
}

exports.down = (pgm) => {
  pgm.dropTable('threads')
}
