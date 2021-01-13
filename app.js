const express = require('express');
const logger = require('morgan');
const connectionManager = require('./connection')
const indexRouter = require('./routes/index');
const globalErrorHandler = require('./controllers/error');
const cors = require('cors');
const whitelist = ['http://localhost:3000'];

const app = express();
connectionManager.getConnection();
app.use(cors({ credentials: true, origin: whitelist }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({})
});

app.use(globalErrorHandler);

module.exports = app;
