const ApplicationErrorConstants = require('../constants/ApplicationErrorConstant');

exports.buildResponse =(err, response) => {
    if (err) {
      return {
        message: ApplicationErrorConstants[err.name],
        code: err.name || null,
      };
    }
    return {
      data: response,
    };
  },

exports.errorResponse= (err) => {
      return {
        message: ApplicationErrorConstants[err.code],
        code: err.code || null,
      };
  }

