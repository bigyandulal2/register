// validators.ts

// Regex for Nepali phone numbers (starts with 98 or 97, 10 digits)
const NEPALI_PHONE_REGEX = /^(?:98|97)\d{8}$/;

// Regex for standard email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate Nepali phone number
 * @param phone - phone number as string
 * @returns boolean
 */
export function isValidNepaliPhone(phone: string): boolean {
  return NEPALI_PHONE_REGEX.test(phone);
}

/**
 * Validate email
 * @param email - email string
 * @returns boolean
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}


