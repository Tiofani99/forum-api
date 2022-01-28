const container = require('../../container')
const createServer = require('../createServer')
const UsersTableTestHelper = require('../../../../tests/database/postgres/UsersTableTestHelper')
const pool = require('../../database/postgres/pool')

describe('users', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
  })

  describe('when POST /users ', () => {
    it('Should response 201 code and persisted register user', async () => {
    // Arrange
      const payload = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJSON.status).toEqual('success')
      expect(responseJSON.data).toBeDefined()
    })

    it('Should response 400 code when request payload not contain needed property', async () => {
    // Arrange
      const payload = {
        username: 'miku',
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
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
        username: 123,
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when username have more than 50 characters length', async () => {
    // Arrange
      const payload = {
        username: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqertyuiop',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when username contain restricted character', async () => {
    // Arrange
      const payload = {
        username: 'miku hatsune',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when username not available', async () => {
    // Arrange
      const payload = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      await UsersTableTestHelper.addUser(payload)
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })
  })
})
