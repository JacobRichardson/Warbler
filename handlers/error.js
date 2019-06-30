/**
 * This is the error handler function.
 * @param {Error} error The error.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function errorHandler(error, request, response, next) {

    //Return a 500 error with a message.
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Error. Something went wrong."
        }
    });
}

//Export the module.
module.exports = errorHandler;