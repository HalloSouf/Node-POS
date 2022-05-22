const errors: {[k: string]: ErrorItem} = {
    INCORRECT_BODY: {
        status: 400,
        message: 'Your body is missing some parts, or it is not given correctly.'
    },
    UNKNOWN_ERROR: {
        status: 500,
        message: 'An unknown error has been occurred.'
    },
    METHOD_NOT_ALLOWED: {
        status: 405,
        message: 'Method is now allowed on this server!'
    },
    INCORRECT_CREDENTIALS: {
        status: 403,
        message: 'Incorrect credentials where given for this user.'
    },
    NO_AUTH_HEADER: {
        status: 401,
        message: 'Where is your authentication-header?'
    },
    INVALID_TOKEN: {
        status: 401,
        message: 'For an authenticated request, you must specify a valid authentication token!'
    }
}

export interface ErrorItem {
    status: number;
    message: string;
}

export default errors;