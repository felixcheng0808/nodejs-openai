import express from 'express'
import { Request, Response } from 'express'
import { MainControllers } from '@/controllers'
// import {
//   ClientControllers,
//   ServerControllers,
//   EnvironmentControllers,
//   AnotherControllers,
//   FileControllers,
//   LogsControllers
// } from '@/controllers'

const router = express.Router()

// system status
router.get('/healthyCheck', (req: Request, res: Response) => res.status(200).send({ code: 0, data: {} }))
router.get('/version', MainControllers.versionInfo)
router.post('/lineWebhook', MainControllers.lineWebhook)
router.post('/sendMessage', MainControllers.sendMessage)

export default router