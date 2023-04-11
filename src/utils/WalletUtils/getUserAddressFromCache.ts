export const getUserAddressFromCache = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('wagmi.store')
      const data = JSON.parse(storedData as string)
      const parsedData = JSON.parse(data)
      if (parsedData?.state?.data) {
        return parsedData.state.data?.account
      }
    }
  } catch (_e) {
    return null
  }
  return null
}
