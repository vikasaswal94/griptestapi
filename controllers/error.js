/**
 * @author vikas aswal
 */
const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const { internalServerErrorResponse, customErrorResponse, validationErrorResponse } = require('./../utils/response');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value.replace(/['"]+/g, '')}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    let validationError = {};
    const errors = Object.values(err.errors).map(el => {
        validationError[el.path] = el.message;
        return el.message
    });
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 422, validationError);
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401);

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        let errObject = {
            statusCode: err.statusCode,
            status: err.status,
            message: err.message,
        };
        if (process.env.NODE_ENV === 'development') {
            errObject.stack = err.stack;
        }
        let response;
        if (err.statusCode === 422) {
            errObject.errors = err.validationErrors;
            response = validationErrorResponse(errObject);
        } else {
            response = customErrorResponse(errObject);
        }
        return res.status(err.statusCode).json(response);
    }
    console.error('ERROR 💥', err);
    return res.status(500).json(internalServerErrorResponse({
        status: 'error',
        message: 'Something went very wrong!'
    }));
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    let error = { ...err };
    error.message = err.message;
    if (err instanceof mongoose.CastError) error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err instanceof mongoose.Error.ValidationError) error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
};