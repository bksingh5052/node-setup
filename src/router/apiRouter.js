import { Router } from 'express'
import apiController from '../controller/apiController.js'
import rateLimit from '../middleware/rateLimit.js'

const router = Router()

router.use(rateLimit)
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

export default router
