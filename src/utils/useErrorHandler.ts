import { ref, reactive, onUnmounted } from "vue"

const ERROR_DISPLAY_DURATION = 3000

type FieldErrors = {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    [key: string]: boolean;
}

export function useErrorHandler() {
    const error = ref<string>('')
    const errors = reactive<FieldErrors>({
        email: false,
        password: false,
        confirmPassword: false
    })

    let errorTimeout: ReturnType<typeof setTimeout> | null = null

    const clearErrorTimeout = () => {
        if (errorTimeout) {
            clearTimeout(errorTimeout)
            errorTimeout = null
        }
    }

    const setError = (message: string, field: string | null = null) => {
        clearErrorTimeout()

        Object.keys(errors).forEach(key => errors[key] = false)

        error.value = message
        if (field && field in errors) {
            errors[field] = true
        }

        if (message) {
            errorTimeout = setTimeout(() => {
                error.value = ''
                Object.keys(errors).forEach(key => errors[key] = false)
                errorTimeout = null
            }, ERROR_DISPLAY_DURATION)
        }
    }

    const clearErrors = () => {
        clearErrorTimeout()
        error.value = ''
        Object.keys(errors).forEach(key => errors[key] = false)
    }

    onUnmounted(clearErrorTimeout)

    return { error, errors, setError, clearErrors }
}
