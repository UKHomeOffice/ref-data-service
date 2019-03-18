import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// local imports
import config from '../config/core';
import logger from '../logger'

const port = config.serverPort || 5000;
const app = express();

// bodyParser allows POST requests
app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

app.listen(port, () => {
  logger.info(`Server Listening on Port: ${port}`);
});
