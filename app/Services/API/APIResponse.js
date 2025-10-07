export const successResponse = async (response, statusCode = 200, message, code, data) => {
    return response.json({
        status: statusCode,
        message: message,
        code: code,
        data: data
    });
}

export const errorResponse = async ( error, response, statusCode, errorMessage ) => {
    response.json({
        status: statusCode,
        errorMessage,
        error: error,
        stack: error.stack
    })
}