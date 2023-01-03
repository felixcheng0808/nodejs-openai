import {
  ClientConfig,
  Client,
  TextMessage,
  ImageMessage
} from '@line/bot-sdk'
import { sendText, sendImage } from '@/services/openai.service'

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}

const client = new Client(clientConfig)

export const lineMessageHandler = async (event) => {
  let openaiRes: string
  let response: TextMessage | ImageMessage
  if (event.message.type !== 'text') return false
  const getMessage = event.message.text
  if (getMessage.startsWith("獅獅 ", 0, 3)) {
    const prompt = getMessage.slice(3)
    if (prompt[0] === '!') {
      openaiRes = await sendImage(prompt.substr(1))
      response = {
        type: 'image', 
        originalContentUrl: openaiRes,
        previewImageUrl: openaiRes
      }
    } else {
      openaiRes = await sendText(prompt)
      response = {
        type: 'text',
        text: openaiRes,
      }
    }
    await client.replyMessage(event.replyToken, response)
  }
}