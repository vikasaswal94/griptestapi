/**
 * @author vikas aswal
 */

function createdResponse(response) {
    return {
        status_code: 201,
        status: response.status || 'success',
        message: response.message || 'created data successfull',
        results: response.data ? response.data : {}
    }
}

function internalServerErrorResponse(response) {
    return {
        status_code: 500,
        status: response.status || 'error',
        message: response.message || 'Something went very wrong!',
        results: response.data ? response.data : null
    }
}

function customErrorResponse(response) {
    return {
        status_code: response.statusCode || 500,
        status: response.status || 'error',
        message: response.message || 'Something went very wrong!',
        stack: response.stack || 'Internal server error',
        results: response.data ? response.data : null
    }
}

function validationErrorResponse(response) {
    return {
        status_code: 422,
        status: 'error',
        errors: response.errors || {},
        message: response.message || 'Something went very wrong!',
        stack: response.stack || 'Internal server error',
        results: response.data ? response.data : null
    }
}


function showResponse(response) {
    return {
        status_code: 200,
        status: response.status || 'success',
        message: response.message || 'Fetch single data successfull',
        results: response.data ? response.data : {}
    }
}

module.exports = {
    createdResponse, showResponse, internalServerErrorResponse, customErrorResponse,
    validationErrorResponse
}