
require('dotenv').config()

const tokenTest = process.env.REACT_APP_TEST_TOKEN
const PORT = ENV === 'test'?
  5000:
  process.env.REACT_APP_PORT
const ENV=process.env.NODE_ENV
const mongoUrl =
  ENV !== 'test'
    ? process.env.REACT_APP_MONGODB_URI
    : process.env.REACT_APP_TEST_MONGODB_URI
module.exports = {
  PORT,
  mongoUrl,
  tokenTest,
  ENV
}
