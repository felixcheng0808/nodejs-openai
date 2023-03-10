import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
})

export const initOpenAI = async () => {
  try {
    // TODO: something pre-work before use openai service
    console.log("[ENV] init OpenAI service complete.")
  } catch (error) {
    console.log("[ENV] init OpenAI service fail.")
    console.log(`[ENV] error message: ${error.message}`)
  }
}

export const sendText = async (prompt: string) => {
  const openai = new OpenAIApi(configuration)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.6,
    max_tokens: 2048
  })
  return completion.data.choices[0].text
}

export const sendImage = async (prompt: string) => {
  const openai = new OpenAIApi(configuration)
  const completion = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  return completion.data.data[0].url
}