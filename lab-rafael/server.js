'use strct';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./route/users');
const articleRouter = require('./route/article');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRouter);
app.use('/api', articleRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Tuning in to port ${PORT}...`);
});
