import { validateEmail, checkEmailAvailability } from './email'
import { validatePasswordStrength, validatePasswordConfirmation } from './password'
import { ERROR_MESSAGES } from './constants'
import { User } from '@/stores/useUserStore'

interface ValidateResult {
    isValid: boolean;
    error: string;
    field: 'email' | 'password' | 'confirmPassword' | null;
}

interface ErrorResult {
    message: string;
    field: 'email' | null; 
}

export function validateRegistrationForm(email: string, password: string, confirmPassword: string, users: User[] = []): ValidateResult {
    if (!email || !password || !confirmPassword) {
        return { isValid: false, error: ERROR_MESSAGES.FILL_ALL_FIELDS, field: null }
    }

    const emailError = validateEmail(email)
    if (emailError) return { isValid: false, error: emailError, field: 'email' }

    const availabilityError = checkEmailAvailability(email, users)
    if (availabilityError) return { isValid: false, error: availabilityError, field: 'email' }

    const passwordError = validatePasswordStrength(password)
    if (passwordError) return { isValid: false, error: passwordError, field: 'password' }

    const confirmError = validatePasswordConfirmation(password, confirmPassword)
    if (confirmError) return { isValid: false, error: confirmError, field: 'confirmPassword' }

    return { isValid: true, error: '', field: null }
}

export function handleRegistrationError(error: any): ErrorResult{
    if (error?.message?.includes('Email already registered')) {
      return { message: ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED, field: 'email' }
    }

    return { message: error?.message || ERROR_MESSAGES.REGISTRATION_FAILED, field: null }
}
