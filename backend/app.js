const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnection = require('./config/dbConnection')

const storesRouter = require('./routes/stores');

const app = express();

dbConnection.connection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/stores', storesRouter);

module.exports = app;
