const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConnection = require('./config/dbConnection')

const storesRouter = require('./routes/stores');
const authRouter = require('./routes/auth');

const app = express();

dbConnection.connection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/stores', storesRouter);
app.use('/api/user', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ops! seems like you are searching in the wrong place' })
});

module.exports = app;
