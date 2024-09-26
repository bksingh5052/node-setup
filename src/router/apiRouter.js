import { Router } from 'express'
import apiController from '../controller/apiController.js'

const router = Router()

router.route('/self').get(apiController.self)

export default router
