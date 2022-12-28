import express from 'express'
import cors from 'cors'

import router from '@/routes'
import { init } from '@/services/environment/environment.service'

const PORT = 9001
const app = express()

init()

app.use(cors())
app.use(express.json())
app.use(router)
app.set('trust proxy', true)

app.listen(PORT, () => {
  console.log(`[ENV] PORT listening on ${PORT}..`)
}).on('error', (error) => {
  console.log(`[ENV] something bad happened', ${error}`)
})
