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

export function saveState(state: any) {
    if (typeof window !== "undefined") {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(storageKey, serializedState)
    }
}

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}
