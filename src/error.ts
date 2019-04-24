// import * as httpStatus from 'http-status'

/**
 * @extends Error
 */
class ApiError extends Error {

    public status: string;
    public isPublic: boolean;
    public isOperational: boolean;

    constructor(message, status, isPublic=true) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(this);
    }
}



export { ApiError }