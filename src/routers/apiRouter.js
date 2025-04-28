import { Router } from 'express'
import apiController from '../controllers/apiController.js'
import rateLimit from '../middlewares/rateLimit.js'

const router = Router()

router.use(rateLimit)
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

export default router
