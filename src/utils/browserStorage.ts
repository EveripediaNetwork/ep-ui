const storageKey = 'serializedState'
const currentDate = new Date()
/*
const expiryTimeline = 86400

const getLocalStorage = () => {
  const setExpiry = JSON.parse(localStorage.getItem(storageKey) || '{}')
  return setExpiry.expiry
} */

export const loadState = () => {
  try {
    const serializedInitialState = JSON.parse(
      localStorage.getItem(storageKey) || '{}',
    )

    if (!serializedInitialState) return undefined

    if (currentDate.getTime() > serializedInitialState.expiry) {
      localStorage.removeItem(storageKey)
    }
    const { updatedState } = serializedInitialState
    return updatedState
  } catch (e) {
    return undefined
  }
}
/*
export function saveState(state: RootState) {

if (typeof window !== 'undefined') {
  let updatedState = state
  if (state.providerNetwork) {
    const providerNetwork = { detectedProvider: null }
    updatedState = { ...state, providerNetwork }
  }
  if (state.wiki.images?.length > 0) {
    const wiki = {
      ...state.wiki,
      images: [],
    }
    updatedState = { ...state, wiki }
  }

  const preSerializedState = {
    updatedState,
    expiry:
      currentDate.getTime() < getLocalStorage()
        ? getLocalStorage()
        : currentDate.getTime() + expiryTimeline,
  }
  localStorage.setItem(storageKey, preSerializedState)
}

} */

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}
