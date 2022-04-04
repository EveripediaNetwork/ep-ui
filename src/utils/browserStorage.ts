import { AccountDataType } from '@/types/AccountDataType'

const storageKey = 'serializedState'
const currentDate = new Date()
const expiryTimeline = 86400

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey) || '{}')
}

export const saveUserToLocalStorage = (user: AccountDataType) => {
  const expiryTime = getLocalStorage()?.expiry || 0
  const preSerializedState = {
    user,
    expiry:
      currentDate.getTime() < expiryTime
        ? expiryTime
        : currentDate.getTime() + expiryTimeline,
  }
  const serializedState = JSON.stringify(preSerializedState)
  localStorage.setItem(storageKey, serializedState)
}

export const getState = () => {
  try {
    const serializedInitialState = getLocalStorage()
    if (!serializedInitialState) return undefined
    if (currentDate.getTime() > serializedInitialState.expiry) {
      localStorage.removeItem(storageKey)
    }
    const { user } = serializedInitialState
    return user
  } catch (e) {
    return undefined
  }
}

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}
