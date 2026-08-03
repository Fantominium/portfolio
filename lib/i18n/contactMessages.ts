export const CONTACT_MESSAGE_CODES = {
  success: "CONTACT_SUCCESS",
  invalidInput: "CONTACT_INVALID_INPUT",
  missingCaptcha: "CONTACT_MISSING_CAPTCHA",
  captchaFailed: "CONTACT_CAPTCHA_FAILED",
  emailFailed: "CONTACT_EMAIL_FAILED",
  unknown: "CONTACT_UNKNOWN_ERROR",
} as const

export function getContactMessage(code?: string, fallback?: string) {
  switch (code) {
    case CONTACT_MESSAGE_CODES.success:
      return "Your message has been sent!"
    case CONTACT_MESSAGE_CODES.invalidInput:
      return "Please check your input and try again."
    case CONTACT_MESSAGE_CODES.missingCaptcha:
      return "Please complete the reCAPTCHA."
    case CONTACT_MESSAGE_CODES.captchaFailed:
      return "reCAPTCHA verification failed."
    case CONTACT_MESSAGE_CODES.emailFailed:
      return "We could not send your message right now."
    default:
      return fallback ?? "Something went wrong"
  }
}
