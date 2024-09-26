import app from './app.js'
import config from './config/config.js'
import logger from './util/logger.js'

const server = app.listen(config.PORT)
;(() => {
     try {
          // Database connection
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
