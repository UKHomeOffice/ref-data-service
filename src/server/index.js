import app from './app';
import config from '../config/core';
import logger from '../logger';

const port = config.serverPort || 5000;

app.listen(port, () => {
  logger.info(`Server Listening on Port: ${port}`);
});
