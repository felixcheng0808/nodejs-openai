import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
})

export const initOpenAI = async () => {
  const openai = new OpenAIApi(configuration)
  try {
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: "Hello world",
    // })
    // console.log(completion.data.choices[0].text)
    console.log("[ENV] init OpenAI service complete.")
  } catch (error) {
    console.log("[ENV] init OpenAI service fail.")
    console.log(`[ENV] error message: ${error.message}`)
  }
}

export const send = async (prompt: string) => {
  const openai = new OpenAIApi(configuration)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.6,
    max_tokens: 2048
  })
  return completion.data.choices[0].text
}