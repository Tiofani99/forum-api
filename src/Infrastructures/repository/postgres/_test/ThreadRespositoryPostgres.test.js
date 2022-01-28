const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const pool = require('../../../database/postgres/pool')
const ThreadsTableTestHelper = require('../../../../../tests/database/postgres/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../../tests/database/postgres/UsersTableTestHelper')
const CreatedThread = require('../../../../Domains/threads/entities/CreatedThread')

describe('ThreadRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
  })

  describe('A addThread function', () => {
    it('Should persist create thread', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 'thread_body',
        owner: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      }
      await UsersTableTestHelper.addUser({
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      })
      const fakeIdGenerator = () => 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      await threadRepositoryPostgres.addThread(payload)

      // Assert
      await expect(ThreadsTableTestHelper.findById('c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c'))
        .resolves.toHaveLength(1)
    })

    it('Should return CreatedThread correctly', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 'thread_body',
        owner: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      }
      const fakeIdGenerator = () => 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
      await UsersTableTestHelper.addUser({ id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c' })

      // Action
      const createdThread = await threadRepositoryPostgres.addThread(payload)

      // Assert
      expect(createdThread).toStrictEqual(new CreatedThread({
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        title: payload.title,
        owner: payload.owner,
      }))
    })
  })
})
