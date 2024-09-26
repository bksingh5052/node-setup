import config from '../config/config.js'
import { rateLimiterMongo } from '../config/rateLimiter.js'
import httpError from '../util/httpError.js'
import responseMessage from '../constant/responseMessage.js'

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
