import config from '../configs/config.js'
import { rateLimiterMongo } from '../configs/rateLimiter.js'
import httpError from '../utils/httpError.js'
import responseMessage from '../constants/responseMessage.js'

export default (req, _, next) => {
     if (config.ENV === 'development') {
          return next()
     }

     if (rateLimiterMongo) {
          rateLimiterMongo
               .consume(req.ip, 1)
               .then(() => {
                    next()
               })
               .catch(() => {
                    httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429)
               })
     }
}
