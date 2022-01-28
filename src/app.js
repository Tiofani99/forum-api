require('dotenv').config()
const createServer = require('./Infrastructures/http/createServer')
const container = require('./Infrastructures/container')

const main = async () => {
  const server = await createServer(container)
  await server.start()

  console.log(`server running on: ${server.info.uri}`)
}

main()
