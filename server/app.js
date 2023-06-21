const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const { ENV, mongoUrl } = require('./Utils/config')
const logger = require('./Utils/logger')
const {
  unkownendpoint,
  requestlogger,
  errorhandler,
  tokenExtractor,
} = require('./Utils/middleware')
const blogrouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('Connecting to', mongoUrl)
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Connected Succsefully to the database')
  })
  .catch((error) => {
    logger.error('error connecting to the db', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestlogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogrouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if(ENV === 'test'){
  console.log(ENV,'AHAHAH')

  const testingRouter=require('./controllers/testing')
  app.use('/api/testing',testingRouter)
}

app.use(unkownendpoint)
app.use(errorhandler)

module.exports = app
