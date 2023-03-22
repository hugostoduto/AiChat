import express from 'express'
import * as dontenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dontenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY

})
const openai = new OpenAIApi(configuration)

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: "Hello"
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt
    const response = await openai.createChatCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})