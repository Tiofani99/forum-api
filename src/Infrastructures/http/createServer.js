const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')
const usersPlugin = require('../../Interfaces/http/api/users')
const authenticationsPlugin = require('../../Interfaces/http/api/authentications')
const threadsPlugin = require('../../Interfaces/http/api/threads')
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator')
const ClientError = require('../../Commons/exceptions/ClientError')

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  })

  await server.register(Jwt)

  server.auth.strategy('jwt_auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: true,
      maxAgeSec: process.env.ACCESSS_TOKEN_AGE,
    },
    validate: (artifacts, request, h) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
        username: artifacts.decoded.payload.username,
      },
    }),
  })

  await server.register([
    {
      plugin: usersPlugin,
      options: {
        container,
      },
    },
    {
      plugin: authenticationsPlugin,
      options: {
        container,
      },
    },
    {
      plugin: threadsPlugin,
      options: {
        container,
      },
    },
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response)
      if (translatedError instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: translatedError.message,
        }).code(translatedError.statusCode)
      }

      if (!translatedError.isServer) {
        return h.continue
      }

      return h.response({
        status: 'error',
        message: 'Maaf, sepertinya terjadi kesalahan di server kami.',
      }).code(500)
    }
    return h.continue
  })

  return server
}

module.exports = createServer
