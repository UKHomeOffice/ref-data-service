import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// local imports
import itemsRouter from './routers/items';
import setsRouter from './routers/sets';

const app = express();

// bodyParser allows POST requests
app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json(),
  itemsRouter,
  setsRouter
);

module.exports = app;
