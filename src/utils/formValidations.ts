export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()

  if (!trimmedEmail) return []

  const errors = []
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

  const isValidEmailFormat = emailRegex.test(trimmedEmail)
  if (!isValidEmailFormat) errors.push('Invalid email format.')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []
  if (password.length <= 3) errors.push('Password must be at least 3 characters')
  // if (!password.includes('*')) errors.push('Password must include special character')
  return errors
}
