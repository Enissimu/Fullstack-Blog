const app = require("./app");
const { PORT } = require("./Utils/config");
const http = require("http");
const logger = require("./Utils/logger");

const server = http.createServer(app);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
