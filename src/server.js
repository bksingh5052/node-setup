import app from './app.js'
import config from './config/config.js'

const server = app.listen(config.PORT)
;(() => {
     try {
          // Database connection
          //  eslint-disable-next-line
          console.info('APPLICATION_STARTED', {
               meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL
               }
          })
     } catch (error) {
          //  eslint-disable-next-line
          console.error('APPLICATION_ERROR', { meta: error })
          server.close((err) => {
               //  eslint-disable-next-line
               console.error('APPLICATION_ERROR', { meta: err })
          })
          process.exit(1)
     }
})()
export default app
