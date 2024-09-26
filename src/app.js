import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

import router from './router/apiRouter.js'
import globalErrorHandler from './middleware/globalErrorHandler.js'
import responseMessage from './constant/responseMessage.js'
import httpError from './util/httpError.js'
import helmet from 'helmet'
import cors from 'cors'
import config from './config/config.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// middleware
app.use(helmet())
app.use(
     cors({
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
          origin: [config.CLIENT_URL],
          credentials: true
     })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

app.use('/api/v1', router)

// 404 Handler
app.use((req, _, next) => {
     try {
          throw new Error(responseMessage.NOT_FOUND('route'))
     } catch (error) {
          httpError(next, error, req, 404)
     }
})

// Global error handler
app.use(globalErrorHandler)

export default app
