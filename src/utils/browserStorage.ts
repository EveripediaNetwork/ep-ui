import type { RootState } from '@/store/store'

const storageKey = 'serializedState'
const currentDate = new Date();
const expiryTimeline = 86400;

export const loadState = () => {
  try {
    const serializedInitialState = localStorage.getItem(storageKey)
    const setExpiry = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (!serializedInitialState) return undefined

    if(currentDate.getTime() > setExpiry) { 
      localStorage.removeItem(storageKey)
    }
    return JSON.parse(serializedInitialState)
  } catch (e) {
    return undefined
  }
}

export function saveState(state: RootState) {  
  if (typeof window !== 'undefined') {
    let updatedState = state
    if (state.providerNetwork) {
      const providerNetwork = { detectedProvider: null }
      updatedState = { ...state, providerNetwork}
    } 
    const preSerializedState = {updatedState, expiry: currentDate.getTime()+expiryTimeline}
    const serializedState = JSON.stringify(preSerializedState)
    localStorage.setItem(storageKey, serializedState)
  }
}

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}