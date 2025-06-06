import express from 'express'
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started succesfuly at port ${PORT}!`)
}) 