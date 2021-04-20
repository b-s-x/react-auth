const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const authRouter = require('./routes/auth.routes')
const cors  = require('./middleware/cors.middleware')

const PORT = config.get('PORT')
const DB_URL = config.get('DB_URL')

app.use(cors)
app.use(express.json())
app.use('/api/auth', authRouter)

const run = async () => {
  try {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => {
      console.log(`Server is working on http://localhost:${PORT}`);
    })

  } catch (err) {
    console.log(err);
  }
}

run()