import responseMessage from '../constant/responseMessage.js'
import httpError from '../util/httpError.js'
import httpresponse from '../util/httpresponse.js'
import quicker from '../util/quicker.js'

export default {
     self: (req, res, next) => {
          try {
               httpresponse(req, res, 200, responseMessage.SUCESS)
          } catch (err) {
               httpError(next, err, req, 500)
          }
     },
     health: (req, res, next) => {
          try {
               const healthData = {
                    application: quicker.getApplictionHealth(),
                    system: quicker.getSystemHealth(),
                    timestamp: Date.now()
               }
               httpresponse(req, res, 200, responseMessage.SUCESS, healthData)
          } catch (err) {
               httpError(next, err, req, 500)
          }
     }
}
