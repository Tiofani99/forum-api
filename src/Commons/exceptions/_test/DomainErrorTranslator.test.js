const DomainErrorTranslator = require('../DomainErrorTranslator')
const InvariantError = require('../InvariantError')

describe('DomainErrorTranslator', () => {
  it('Should translate error correctly', () => {
    // Assert
    /** REGISTER_USER */
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Gagal menambahkan user baru. Properti yang dibutuhkan tidak boleh kosong.'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_MEET_CORRECT_DATA_TYPE')))
      .toStrictEqual(new InvariantError('Gagal menambahkan user baru. Tipe data properti tidak sesuai.'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHARS')))
      .toStrictEqual(new InvariantError('Gagal menambahkan user baru. Username terlalu panjang.'))
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.PASSWORD_MINIMUM_CHARS')))
      .toStrictEqual(new InvariantError('Gagal menambahkan user baru. Password terlalu pendek.'))

    /** PERFORM_LOGIN */
    expect(DomainErrorTranslator.translate(new Error('PERFORM_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Gagal login. Properti yang dibutuhkan tidak boleh kosong.'))
    expect(DomainErrorTranslator.translate(new Error('PERFORM_LOGIN.NOT_MEET_CORRECT_DATA_TYPE')))
      .toStrictEqual(new InvariantError('Gagal login. Tipe data properti tidak sesuai.'))
    expect(DomainErrorTranslator.translate(new Error('PERFORM_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('Gagal login. Username mengandung karakter yang dilarang.'))
    expect(DomainErrorTranslator.translate(new Error('PERFORM_LOGIN.USERNAME_LIMIT_CHARS')))
      .toStrictEqual(new InvariantError('Gagal login. Username terlalu panjang.'))

    /** REFRESH_TOKEN */
    expect(DomainErrorTranslator.translate(new Error('REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Gagal melakukan refresh token. Properti yang dibutuhkan tidak boleh kosong.'))
    expect(DomainErrorTranslator.translate(new Error('REFRESH_TOKEN.NOT_MEET_CORRECT_DATA_TYPE')))
      .toStrictEqual(new InvariantError('Gagal melakukan refresh token. Tipe data properti tidak sesuai.'))

    /** DELETE_TOKEN */
    expect(DomainErrorTranslator.translate(new Error('LOGOUT.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Gagal melakukan logout. Properti yang dibutuhkan tidak boleh kosong.'))
    expect(DomainErrorTranslator.translate(new Error('LOGOUT.NOT_MEET_CORRECT_DATA_TYPE')))
      .toStrictEqual(new InvariantError('Gagal melakukan logout. Tipe data properti tidak sesuai.'))

    /** CREATE_THREAD */
    expect(DomainErrorTranslator.translate(new Error('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Gagal menambahkan thread. Properti yang dibutuhkan tidak boleh kosong.'))
    expect(DomainErrorTranslator.translate(new Error('CREATE_THREAD.NOT_MEET_CORRECT_DATA_TYPE')))
      .toStrictEqual(new InvariantError('Gagal menambahkan thread. Tipe data properti tidak sesuai.'))
  })

  it('Should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some error message')

    // Action
    const translatedError = DomainErrorTranslator.translate(error)

    // Assert
    expect(translatedError).toStrictEqual(error)
  })
})
