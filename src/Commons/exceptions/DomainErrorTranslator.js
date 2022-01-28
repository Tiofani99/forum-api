const InvariantError = require('./InvariantError')

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator.directories[error.message] || error
  },
}

DomainErrorTranslator.directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Gagal menambahkan user baru. Properti yang dibutuhkan tidak boleh kosong.'),
  'REGISTER_USER.NOT_MEET_CORRECT_DATA_TYPE': new InvariantError('Gagal menambahkan user baru. Tipe data properti tidak sesuai.'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'REGISTER_USER.USERNAME_LIMIT_CHARS': new InvariantError('Gagal menambahkan user baru. Username terlalu panjang.'),
  'REGISTER_USER.PASSWORD_MINIMUM_CHARS': new InvariantError('Gagal menambahkan user baru. Password terlalu pendek.'),

  'PERFORM_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Gagal login. Properti yang dibutuhkan tidak boleh kosong.'),
  'PERFORM_LOGIN.NOT_MEET_CORRECT_DATA_TYPE': new InvariantError('Gagal login. Tipe data properti tidak sesuai.'),
  'PERFORM_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('Gagal login. Username mengandung karakter yang dilarang.'),
  'PERFORM_LOGIN.USERNAME_LIMIT_CHARS': new InvariantError('Gagal login. Username terlalu panjang.'),

  'REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Gagal melakukan refresh token. Properti yang dibutuhkan tidak boleh kosong.'),
  'REFRESH_TOKEN.NOT_MEET_CORRECT_DATA_TYPE': new InvariantError('Gagal melakukan refresh token. Tipe data properti tidak sesuai.'),

  'LOGOUT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Gagal melakukan logout. Properti yang dibutuhkan tidak boleh kosong.'),
  'LOGOUT.NOT_MEET_CORRECT_DATA_TYPE': new InvariantError('Gagal melakukan logout. Tipe data properti tidak sesuai.'),

  'CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Gagal menambahkan thread. Properti yang dibutuhkan tidak boleh kosong.'),
  'CREATE_THREAD.NOT_MEET_CORRECT_DATA_TYPE': new InvariantError('Gagal menambahkan thread. Tipe data properti tidak sesuai.'),
}

module.exports = DomainErrorTranslator
