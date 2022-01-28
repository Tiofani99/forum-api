/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
    },
    comment_id: {
      type: 'CHAR(36)',
    },
    user_id: {
      type: 'CHAR(36)',
    },
    content: {
      type: 'VARCHAR(500)',
    },
    created_at: {
      type: 'TEXT',
    },
    deleted_at: {
      type: 'TEXT',
    },
  })

  pgm.createConstraint('replies', 'fk_replies.comment_id_comments.id', 'FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE')
  pgm.createConstraint('replies', 'fk_replies.user_id_users.id', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE')
}

exports.down = (pgm) => {
  pgm.dropTable('replies')
}
