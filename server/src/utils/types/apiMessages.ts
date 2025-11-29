export interface ApiMessage {
    code: string;       // short, machine-friendly code (e.g. "USER_ALREADY_EXISTS")
    statusCode: number; // HTTP status code
    message: string;    // human-friendly message
}

export const ApiMessages = {
    VALIDATION_REQUIRED_FIELDS: {
        code: "VALIDATION_REQUIRED_FIELDS",
        statusCode: 400,
        message: "Name, email, password and employeeId are required.",
    },

    VALIDATION_LOGIN_FIELDS: {
        code: "VALIDATION_LOGIN_FIELDS",
        statusCode: 400,
        message: "Email and password are required.",
    },

    MANAGER_REGISTRATION_FORBIDDEN: {
        code: "MANAGER_REGISTRATION_FORBIDDEN",
        statusCode: 403,
        message: "Managers cannot register via this route.",
    },

    USER_ALREADY_EXISTS: {
        code: "USER_ALREADY_EXISTS",
        statusCode: 400,
        message: "User already exists, try logging in.",
    },

    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        statusCode: 404,
        message: "No user found, please register first.",
    },

    CURRENT_USER_NOT_FOUND: {
        code: "CURRENT_USER_NOT_FOUND",
        statusCode: 404,
        message: "User not found.",
    },

    UNAUTHORIZED: {
        code: "UNAUTHORIZED",
        statusCode: 401,
        message: "Unauthorized.",
    },

    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        statusCode: 401,
        message: "Incorrect credentials.",
    },

    ROUTE_NOT_FOUND: {
        code: "ROUTE_NOT_FOUND",
        statusCode: 404,
        message: "Route not found.",
    },

    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        statusCode: 500,
        message: "Something went wrong, please try again.",
    },
} as const;
