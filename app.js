import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config';
import dbConnect from './lib/database.js';
import productRouter from './routes/products.js';
import companyRouter from './routes/company.js';

const app = express()
console.log(process.env.PORT)

app.use(bodyParser.json())

// Enable CORS for all routes
app.use(cors())

// Connect to database
dbConnect();

app.get('/', (req, res) => {
  res.send('Database connected')
})

app.use('/products', productRouter);
app.use('/partners', companyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})