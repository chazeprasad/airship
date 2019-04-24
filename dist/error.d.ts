/**
 * @extends Error
 */
declare class ApiError extends Error {
    status: string;
    isPublic: boolean;
    isOperational: boolean;
    constructor(message: any, status: any, isPublic?: boolean);
}
export { ApiError };
