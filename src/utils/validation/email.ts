import { ERROR_MESSAGES } from './constants'
import { User } from '@/stores/useUserStore'

export function validateEmail(email: string): string {
  if (!email?.trim()) return ERROR_MESSAGES.EMAIL_REQUIRED

  const trimmedEmail = email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(trimmedEmail)) return ERROR_MESSAGES.EMAIL_INVALID
  if (trimmedEmail.length > 254) return ERROR_MESSAGES.EMAIL_TOO_LONG

  const localPart = trimmedEmail.split('@')[0]
  if (localPart.length > 64) return ERROR_MESSAGES.EMAIL_LOCAL_PART_TOO_LONG

  return ''
}

export function checkEmailAvailability(
  email: string,
  users: User[] = []
): string {
  if (!email || !users.length) return ''

  const exists = users.find(
    (user) => user?.email?.toLowerCase() === email.toLowerCase()
  )

  return exists ? ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED : ''
}
