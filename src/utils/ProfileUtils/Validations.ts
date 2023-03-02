// Validation Functions
export const validateUsername = (
  name: string,
  userENSAddr?: string,
): string => {
  if (!name) return 'Username is required'
  if (name.length < 3) {
    return 'Username must be at least 3 characters long'
  }
  if (name.length > 20) {
    return 'Username must be less than 20 characters long'
  }
  if (name.endsWith('.eth')) {
    if (name !== userENSAddr) {
      return 'The account address is not linked with this ens address'
    }
  }
  if (!/^[a-z0-9]+(.eth)$|^[a-zA-Z0-9_]+$/.test(name)) {
    return 'Username can only contain letters, numbers and underscores'
  }

  return ''
}

export const validateBio = (bio: string): string => {
  if (bio.length > 85) {
    return 'Bio must be 85 characters or less'
  }
  return ''
}

export const validateEmail = (email: string): string => {
  if (!email.length) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Email is not valid'
  }
  return ''
}
