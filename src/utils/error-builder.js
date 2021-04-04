function buildError (errorObj) {
  const error = new Error();
  error.statusCode = errorObj.statusCode;
  error.code = errorObj.code;
  error.message = errorObj.message;
  return error;
}

const errorBuilder = {
  buildInvalidTokenError: function (errorMessage = null) {
    const defaultInvalidTokenError = {
      statusCode: 403,
      code: 'INVALID_TOKEN',
      message: errorMessage || 'Invalid token',
    };
    return buildError(defaultInvalidTokenError);
  },
  buildInternalServerError: function (errorMessage = null) {
    const defaultInternalServerError = {
      statusCode: 500,
      code: 'INTERNAL_ERROR',
      message: errorMessage || 'The server encountered an internal error',
    };
    return buildError(defaultInternalServerError);
  },
  buildUnavailableOperationError: function (errorMessage = null) {
    const defaultInvalidInputParamsError = {
      statusCode: 400,
      code: 'UNAVAILABLE_OPERATION',
      message: errorMessage || 'Requested operation currently is not available',
    };
    return buildError(defaultInvalidInputParamsError);
  },
  buildInvalidRequestParamsError: function (errorMessage = null) {
    const defaultInvalidInputParamsError = {
      statusCode: 400,
      code: 'INVALID_REQUEST_PARAMS',
      message: errorMessage || 'Incorrect request parameters',
    };
    return buildError(defaultInvalidInputParamsError);
  },
  buildBadRequestError: function (errorMessage = null) {
    const defaultBadRequestError = {
      statusCode: 400,
      code: 'BAD_REQUEST',
      message: errorMessage || 'Bad request error',
    };
    return buildError(defaultBadRequestError);
  },
  buildForbiddenError: function (errorMessage = null) {
    const defaultForbiddenError = {
      statusCode: 403,
      code: 'FORBIDDEN',
      message: errorMessage || 'Forbidden request error',
    };
    return buildError(defaultForbiddenError);
  },
  buildNotFoundError: function (errorMessage = null) {
    const defaultNotFoundError = {
      statusCode: 404,
      code: 'NOT_FOUND',
      message: errorMessage || 'Not found error',
    };
    return buildError(defaultNotFoundError);
  },
};

module.exports = errorBuilder;
