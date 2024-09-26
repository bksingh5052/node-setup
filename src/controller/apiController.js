import responseMessage from '../constant/responseMessage.js'
import httpError from '../util/httpError.js'
import httpresponse from '../util/httpresponse.js'

export default {
     self: (req, res, next) => {
          try {
               httpresponse(req, res, 200, responseMessage.SUCESS)
          } catch (err) {
               httpError(next, err, req, 500)
          }
     }
}
