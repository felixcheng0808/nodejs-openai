import {
  ClientConfig,
  Client,
  TextMessage
} from '@line/bot-sdk'
import { send } from '@/services/openai.service'

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}

const client = new Client(clientConfig)

export const lineMessageHandler = async (event) => {
  let openaiRes: string
  if (event.message.type !== 'text') return false
  const getMessage = event.message.text
  if (getMessage.startsWith("獅獅 ", 0, 3)) {
    const prompt = getMessage.slice(3)
    openaiRes = await send(prompt)
    const response: TextMessage = {
      type: 'text',
      text: openaiRes,
    }
    await client.replyMessage(event.replyToken, response)
  }
}