import type { RootState } from '@/store/store'

const storageKey = 'serializedState'

export const loadState = () => {
  try {
    const serializedInitialState = localStorage.getItem(storageKey)
    if (!serializedInitialState) return undefined
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
      updatedState = { ...state, providerNetwork }
    }
    const serializedState = JSON.stringify(updatedState)
    localStorage.setItem(storageKey, serializedState)
  }
}

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}
