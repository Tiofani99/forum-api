const createServer = require('../createServer')
const container = require('../../container')

describe('HTTP server', () => {
  it('Should handle server error correctly', async () => {
    // Arrange
    const payload = {
      username: 'miku',
      fullname: 'Hatsune Miku',
      password: 'password',
    }
    const server = await createServer({})

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload,
    })

    // Assert
    const responseJSON = JSON.parse(response.payload)
    expect(response.statusCode).toEqual(500)
    expect(responseJSON.status).toEqual('error')
    expect(responseJSON.message).toEqual('Maaf, sepertinya terjadi kesalahan di server kami.')
  })
})
