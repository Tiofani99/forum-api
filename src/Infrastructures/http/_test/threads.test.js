const createServer = require('../createServer')
const container = require('../../container')
const pool = require('../../database/postgres/pool')
const UsersTableTestHelper = require('../../../../tests/database/postgres/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/database/postgres/AuthenticationsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/database/postgres/ThreadsTableTestHelper')

describe('threads', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })

  describe('when POST /threads', () => {
    it('Should response 201 code and create thread', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 'thread_body',
      }
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'miku',
          fullname: 'Hatsune Miku',
          password: 'password',
        },
      })

      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'miku',
          password: 'password',
        },
      })

      const { data: { accessToken } } = JSON.parse(loginResponse.payload)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJSON.status).toEqual('success')
      expect(responseJSON.data.addedThread.id).toBeDefined()
      expect(responseJSON.data.addedThread.title).toBeDefined()
      expect(responseJSON.data.addedThread.owner).toBeDefined()
    })

    it('Should response 401 code when request with no authentication', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 'thread_body',
      }

      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(401)
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when payload not contain needed property', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
      }
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'miku',
          fullname: 'Hatsune Miku',
          password: 'password',
        },
      })

      const loginReponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'miku',
          password: 'password',
        },
      })

      const { data: { accessToken } } = JSON.parse(loginReponse.payload)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when request payload not meet correct data type', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 123,
      }
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'miku',
          fullname: 'Hatsune Miku',
          password: 'password',
        },
      })

      const loginReponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'miku',
          password: 'password',
        },
      })

      const { data: { accessToken } } = JSON.parse(loginReponse.payload)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      })
      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })
  })
})
