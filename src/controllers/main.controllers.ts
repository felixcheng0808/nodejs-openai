import { Request, Response } from 'express'
import { getVersion } from '@/services/environment/environment.service'
import { sendText } from '@/services/openai.service'
import { lineMessageHandler } from '@/services/linebot.service'

export const versionInfo = async (req: Request, res: Response) => {
  await getVersion().then(result => {
    res.status(200).send({ code: 0, data: { version: result }, msg: 'get versionInfo success' })
  }).catch(error => {
    console.log(`[ENV] controllers [versionInfo] error : ${error}`)
    res.status(500).send({ code: 1, data: false, msg: 'versionInfo error' })
  })
}

export const lineWebhook = async (req: Request, res: Response) => {
  const event = req.body.events[0]
  if (event.type === 'message') {
    await lineMessageHandler(event)
    console.log('lineWebhook', event)
    return true
  } else {
    res.status(200).send('')
  }
}

export const sendMessage = async (req: Request, res: Response) => {
  const { msg } = req.body
  let _res: string
  if (msg.startsWith("獅獅 ", 0, 3)) {
    const prompt = msg.slice(3)
    _res = await sendText(prompt)
    res.status(200).send(_res)
  } else {
    res.status(200).send('')
  }
}