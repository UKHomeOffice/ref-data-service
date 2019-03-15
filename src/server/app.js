import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';

const port = 5000;
const app = express();

// bodyParser allows POST requests
app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

app.listen(port, () => {
  winston.info(`Server Listening on Port: ${port}`);
  winston.info('Press Ctrl+Shift+C to quit.');
});
