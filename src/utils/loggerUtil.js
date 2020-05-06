import logger from '../resource/logger'

const logHttpRequestError = (request, errorObj) => {
    const logObj = {
        message : errorObj.message,
        stack : errorObj.stack,
        url : request.url,
        query : JSON.stringify(request.query),
        body : JSON.stringify(request.body),
        userEmail : request.user && request.user.email,
        initiator : 'server',
    };
    logger.error(logObj);
};
const logGenerelError = (errorObj, errorType, otherProperties = {}) => {
    let logObj = {
        message : errorObj.message,
        stack : errorObj.stack,
        initiator : 'server',
        errorType,
        
    }
    logObj = Object.assign(otherProperties, logObj); // merge objects
    logger.error(logObj);
}
const logSimpleTextError = (message, errorType, otherProperties = {}) => {
    let logObj = {
        message,
        errorType,
    }
    logObj = Object.assign(otherProperties, logObj);
    logger.error(logObj);
}

export default {
    logHttpRequestError,
    logGenerelError,
    logSimpleTextError
};
