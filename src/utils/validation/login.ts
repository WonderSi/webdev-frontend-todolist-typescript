import { validateEmail } from './email'
import { validatePasswordLogin } from './password'
import { ERROR_MESSAGES } from './constants'

interface ValidationResult {
    isValid: boolean;
    error: string;
    field: 'email' | 'password' | null;
}

interface ErrorResult {
    message: string;
    field: 'email' | 'password' | null;
}

interface AppError {
    code?: string;
    message: string;
}


function isAppError(error: unknown): error is AppError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
    )
}

export function validateLoginForm(email: string, password: string): ValidationResult {
    const emailError = validateEmail(email)
    if (emailError) return { isValid: false, error: emailError, field: 'email' }

    const passwordError = validatePasswordLogin(password)
    if (passwordError) return { isValid: false, error: passwordError, field: 'password' }

    return { isValid: true, error: '', field: null }
}

export function handleLoginError(error: unknown): ErrorResult {
    if (isAppError(error)) {
        switch (error?.code) {
            case 'USER_NOT_FOUND':
                return { message: 'User with this email does not exist', field: 'email' }
            case 'INVALID_PASSWORD':
                return { message: 'Incorrect password', field: 'password' }
            default:
                return { message: error?.message || ERROR_MESSAGES.LOGIN_FAILED, field: null }
        }
    }

    return { message: ERROR_MESSAGES.LOGIN_FAILED, field: null }
}
