const app = require('./app')
const { PORT } = require('./Utils/config')
const logger = require('./Utils/logger')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
