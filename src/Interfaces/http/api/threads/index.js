const routes = require('./routes')
const ThreadsHandler = require('./handler')

const threadsPlugin = {
  name: 'threads',
  version: '1.0.0',
  register: async (server, { container }) => {
    const threadsHandler = new ThreadsHandler(container)

    server.route(routes(threadsHandler))
  },
}

module.exports = threadsPlugin
