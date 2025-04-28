import app from './app.js'
import config from './configs/config.js'
import { initRateLimiter } from './configs/rateLimiter.js'
import databaseService from './services/databaseService.js'
import logger from './utils/logger.js'

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

          initRateLimiter(connection)
          logger.info('RATE_LIMITER_INITIATED')

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
