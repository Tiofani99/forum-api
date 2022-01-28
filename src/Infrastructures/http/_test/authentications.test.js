const container = require('../../container')
const createServer = require('../createServer')
const AuthenticationsTableTestHelper = require('../../../../tests/database/postgres/AuthenticationsTableTestHelper')
const AuthTokenManager = require('../../../Applications/security/AuthTokenManager')
const UsersTableTestHelper = require('../../../../tests/database/postgres/UsersTableTestHelper')
const pool = require('../../database/postgres/pool')

describe('authentications', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })

  describe('when POST /authentications', () => {
    it('Should response 201 and provide correct response payload when username and password correctly', async () => {
    // Arrange
      const userData = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const payload = {
        username: 'miku',
        password: 'password',
      }
      const server = await createServer(container)

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: userData,
      })
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJSON.status).toEqual('success')
      expect(responseJSON.data.accessToken).toBeDefined()
      expect(responseJSON.data.refreshToken).toBeDefined()
    })

    it('Should response 400 code when incorrect username', async () => {
    // Arrange
      const userData = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const payload = {
        username: 'mikuuuuuu',
        password: 'password',
      }
      await UsersTableTestHelper.addUser(userData)
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 401 code when incorrect password', async () => {
    // Arrange
      const userData = {
        username: 'miku',
        fullname: 'Hatsune Miku',
        password: 'password',
      }
      const payload = {
        username: 'miku',
        password: 'password123',
      }
      await UsersTableTestHelper.addUser(userData)
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(401)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when request payload not contain needed property', async () => {
    // Arrange
      const payload = {
        username: 'miku',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
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
        password: 'password',
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
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
        url: '/authentications',
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
        url: '/authentications',
        payload,
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })
  })

  describe('when PUT /authentications', () => {
    it('Should response 200 code and provide accessToken', async () => {
      // Arrange
      const server = await createServer(container)

      /** register user */
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'miku',
          fullname: 'Hatsune Miku',
          password: 'password',
        },
      })

      /** perform login */
      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'miku',
          password: 'password',
        },
      })

      const { data: { refreshToken } } = JSON.parse(loginResponse.payload)

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJSON.status).toEqual('success')
      expect(responseJSON.data.accessToken).toBeDefined()
    })

    it('Should response 400 code when payload not contain needed property', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {},
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when payload not meet correct data type', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken: 123,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when refreshToken invalid', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken: 'refresh_token',
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when refreshToken not in database', async () => {
      // Arrange
      const server = await createServer(container)
      const refreshToken = container
        .getInstance(AuthTokenManager.name)
        .generateRefreshToken({ username: 'miku' })

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })
  })

  describe('when DELETE /authentications', () => {
    it('Should response 200 code when success logout', async () => {
      // Arrange
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

      const { data: { refreshToken } } = JSON.parse(loginResponse.payload)

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJSON.status).toEqual('success')
    })

    it('Should response 400 code when request payload not contain needed property', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {},
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should response 400 code when request payload not meet correct data type', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken: 123,
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })

    it('Should repsonse 400 code when refreshToken invalid', async () => {
      // Arrange
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken: 'refresh_token',
        },
      })

      // Assert
      const responseJSON = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJSON.status).toEqual('fail')
      expect(responseJSON.message).toBeDefined()
    })
  })

  it('Should response 400 code when refershToken not in database', async () => {
    // Arrange
    const server = await createServer(container)
    const refreshToken = container
      .getInstance(AuthTokenManager.name)
      .generateRefreshToken({ userId: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c', username: 'miku' })

    // Action
    const response = await server.inject({
      method: 'DELETE',
      url: '/authentications',
      payload: {
        refreshToken,
      },
    })

    // Assert
    const responseJSON = JSON.parse(response.payload)
    expect(response.statusCode).toEqual(400)
    expect(responseJSON.status).toEqual('fail')
    expect(responseJSON.message).toBeDefined()
  })
})
