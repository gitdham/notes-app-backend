const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.Server({ port: 5000, host: '127.0.0.1' })

  server.route(routes)

  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

init()
