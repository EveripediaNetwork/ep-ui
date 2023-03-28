export const getUserAddressFromCache = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('wagmi.store')
      const data = JSON.parse(storedData as string)
      const parsedData = JSON.parse(data)
      if (parsedData && parsedData.state && parsedData.state.data) {
        return parsedData.state.data?.account
      }
    }
  } catch (e) {
    return null
  }
  return null
}
