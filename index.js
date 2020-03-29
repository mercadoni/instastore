/**
 * Start server
 */

const app = require('./app')
const serverConfig = require('./config')
const { connectDB } = require('./api/service/db')

connectDB()

app.listen(serverConfig.port, () => console.log('Node server listening on port ' + serverConfig.port))
