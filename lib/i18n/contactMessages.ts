export const CONTACT_MESSAGE_CODES = {
  success: "success",
  nameRequired: "nameRequired",
  emailRequired: "emailRequired",
  subjectRequired: "subjectRequired",
  opportunityRequired: "opportunityRequired",
  employmentTypeRequired: "employmentTypeRequired",
  recaptchaRequired: "recaptchaRequired",
  invalidInput: "invalidInput",
  recaptchaFailed: "recaptchaFailed",
  emailFailed: "emailFailed",
  unknown: "unknown",
} as const

export type ContactMessageCode = (typeof CONTACT_MESSAGE_CODES)[keyof typeof CONTACT_MESSAGE_CODES]

const CONTACT_MESSAGE_KEYS: Record<ContactMessageCode, string> = {
  success: "success",
  nameRequired: "nameRequired",
  emailRequired: "emailRequired",
  subjectRequired: "subjectRequired",
  opportunityRequired: "opportunityRequired",
  employmentTypeRequired: "employmentTypeRequired",
  recaptchaRequired: "recaptchaRequired",
  invalidInput: "invalidInput",
  recaptchaFailed: "recaptchaFailed",
  emailFailed: "emailFailed",
  unknown: "unknown",
}

export function getContactMessageKey(code?: string) {
  if (code && code in CONTACT_MESSAGE_KEYS) {
    return CONTACT_MESSAGE_KEYS[code as ContactMessageCode]
  }

  return CONTACT_MESSAGE_KEYS.unknown
}

export function getContactFieldErrorKey(code?: string) {
  return getContactMessageKey(code)
}

export function getContactMessage(code?: string, fallback?: string) {
  switch (code) {
    case CONTACT_MESSAGE_CODES.success:
      return "success"
    case CONTACT_MESSAGE_CODES.invalidInput:
      return "invalidInput"
    case CONTACT_MESSAGE_CODES.recaptchaRequired:
      return "recaptchaRequired"
    case CONTACT_MESSAGE_CODES.recaptchaFailed:
      return "recaptchaFailed"
    case CONTACT_MESSAGE_CODES.emailFailed:
      return "emailFailed"
    default:
      return fallback ?? CONTACT_MESSAGE_KEYS.unknown
  }
}
