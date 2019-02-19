/**
 * @extends Error
 */
declare class ApplicationError extends Error {
    status: string;
    isPublic: string;
    isOperational: boolean;
    constructor(message: any, status: any, isPublic: any);
}
/**
 * Class representing an API error.
 * @extends ExtendableError
 */
declare class ApiError extends ApplicationError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message: any, status?: number, isPublic?: boolean);
}
export { ApplicationError, ApiError };
