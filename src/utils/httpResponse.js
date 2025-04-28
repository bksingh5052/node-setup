import config from '../configs/config.js'
import logger from './logger.js'

export default (req, res, responseStatusCode, responseMessage, resData = null) => {
     const response = {
          success: true,
          statusCode: responseStatusCode,
          request: {
               ip: req.ip || null,
               method: req.method,
               url: req.originalUrl
          },
          message: responseMessage,
          data: resData
     }

     // Log
     // Log
     // eslint-disable-next-line no-unused-vars
     const { data, ...rest } = response
     logger.info(`CONTROLLER_RESPONSE`, {
          meta: rest
     })

     // Production Env check
     if (config.ENV === 'production') {
          delete response.request.ip
     }
     res.status(responseStatusCode).json(response)
}
