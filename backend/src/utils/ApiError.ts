import { Response } from 'express';
import errors from '../constants/errors';

/**
 * ApiError
 */
class ApiError {
    
    public code: keyof typeof errors;

    /**
     * @param code Error code 
     */
    constructor(code: keyof typeof errors) {
        this.code = code;
    }

    /**
     * Send error message
     * @param res Express response
     */
    public send(res: Response): Response {
        if (ApiError.hasKey(errors, this.code)) {
            const error: ErrorObject = errors[this.code];

            return res.status(error.status).json({
                error: this.code,
                message: error.message
            });
        }

        return res.status(500).json({
            error: 'UNKNOWN_ERROR',
            message: 'An unexpected error showed up on our server!'
        });
    }

    /**
     * Check if key is located in object
     * @param obj Object
     * @param key Key
     */
    private static hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
        return key in obj;
    }

}

export interface ErrorObject {
    error?: string;
    status: number;
    message: string;
}

export default ApiError;