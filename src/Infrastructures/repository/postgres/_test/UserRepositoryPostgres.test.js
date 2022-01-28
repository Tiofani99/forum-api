const UserRepositoryPostgres = require('../UserRepositoryPostgres')
const UserRepository = require('../../../../Domains/users/UserRepository')
const UsersTableTestHelper = require('../../../../../tests/database/postgres/UsersTableTestHelper')
const pool = require('../../../database/postgres/pool')
const RegisteredUser = require('../../../../Domains/users/entities/RegisteredUser')
const InvariantError = require('../../../../Commons/exceptions/InvariantError')

describe('User Repository', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
  })

  it('Should to be instanceof UserRepository', () => {
    // Arrange
    const userRepositoryPostgres = new UserRepositoryPostgres({}, {})

    // Assert
    expect(userRepositoryPostgres).toBeInstanceOf(UserRepository)
  })

  describe('A addUser function', () => {
    it('Should persist register user', async () => {
      // Arrange
      const payload = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const fakeIdGenerator = () => 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c' // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      await userRepositoryPostgres.addUser(payload)

      // Assert
      const users = await UsersTableTestHelper.findUserById('c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c')
      expect(users).toHaveLength(1)
    })

    it('Should return registered user correctly', async () => {
      // Arrange
      const payload = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const fakeIdGenerator = () => 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c' // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      const users = await userRepositoryPostgres.addUser(payload)

      // Arrange
      expect(users).toStrictEqual(new RegisteredUser({
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
        fullname: 'Hatsune Miku',
      }))
    })
  })

  describe('A verifyAvailableUsername function', () => {
    it('Should throw InvariantError when username already exists', async () => {
      // Arrange
      const payload = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const fakeIdGenerator = () => 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c'
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)
      await userRepositoryPostgres.addUser(payload)

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('miku')).rejects.toThrowError(InvariantError)
    })

    it('Should not throw InvariantError when username available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('miku')).resolves.not.toThrowError(InvariantError)
    })
  })

  describe('A findUserByUsername function', () => {
    it('Should throw InvariantError when username not found', async () => {
      // Arrange
      const username = 'miku'
      const userRepositoryPostgres = new UserRepositoryPostgres(pool)

      // Assert
      await expect(userRepositoryPostgres.findUserByUsername(username))
        .rejects.toThrowError(InvariantError)
    })

    it('Should return user data when user is found', async () => {
      // Arrange
      const payload = {
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const expectedUserData = {
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      await UsersTableTestHelper.addUser(payload)
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action
      const user = await userRepositoryPostgres.findUserByUsername('miku')

      // Assert
      expect(user).toEqual(expectedUserData)
    })
  })
})
