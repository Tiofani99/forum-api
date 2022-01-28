const routes = require('./routes')
const UsersHandler = require('./handler')

const usersPlugin = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container)

    server.route(routes(usersHandler))
  },
}

module.exports = usersPlugin
