const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const storesRouter = require('./routes/stores');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/stores', storesRouter);

module.exports = app;
