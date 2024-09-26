import app from './app.js'
import config from './config/config.js'
import databaseService from './services/databaseService.js'
import logger from './util/logger.js'

const server = app.listen(config.PORT)
;(async () => {
     try {
          // Database connection
          const connection = await databaseService.connect()
          logger.info('DATABASE CONNECTION', {
               meta: {
                    CONNECTION_NAME: connection.name
               }
          })
          logger.info('APPLICATION_STARTED', {
               meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL
               }
          })
     } catch (error) {
          logger.error('APPLICATION_ERROR', { meta: error })
          server.close((err) => {
               logger.error('APPLICATION_ERROR', { meta: err })
          })
          process.exit(1)
     }
})()
export default app
