import responseMessage from '../constant/responseMessage.js'
import config from '../config/config.js'

export default (err, req, errorStatusCode = 500) => {
     const errorObj = {
          success: false,
          statusCode: errorStatusCode,
          request: {
               ip: req.ip || null,
               method: req.method,
               url: req.originalUrl
          },
          message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
          data: null,
          trace: err instanceof Error ? { error: err.stack } : null
     }

     // Log
     //  eslint-disable-next-line
     console.error(`CONTROLLER_ERROR`, {
          meta: errorObj
     })

     // Production Env check
     if (config.ENV === 'production') {
          delete errorObj.request.ip
          delete errorObj.trace
     }

     return errorObj
}
