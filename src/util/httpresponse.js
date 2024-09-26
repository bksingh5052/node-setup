import config from '../config/config.js'

export default (req, res, responseStatusCode, responseMessage, data = null) => {
     const response = {
          success: true,
          statusCode: responseStatusCode,
          request: {
               ip: req.ip || null,
               method: req.method,
               url: req.originalUrl
          },
          message: responseMessage,
          data: data
     }

     // Log
     //  eslint-disable-next-line
     console.info(`CONTROLLER_RESPONSE`, {
          meta: response
     })

     // Production Env check
     if (config.ENV === 'production') {
          delete response.request.ip
     }
     res.status(responseStatusCode).json(response)
}
