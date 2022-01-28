/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
    },
    content: {
      type: 'VARCHAR(500)',
    },
    thread_id: {
      type: 'CHAR(36)',
    },
    user_id: {
      type: 'CHAR(36)',
    },
    created_at: {
      type: 'TEXT',
    },
    deleted_at: {
      type: 'TEXT',
    },
  })

  pgm.createConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE')
  pgm.createConstraint('comments', 'fk_comments.user_id_users.id', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE')
}

exports.down = (pgm) => {
  pgm.dropTable('comments')
}
