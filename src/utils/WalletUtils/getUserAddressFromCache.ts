export const getUserAddressFromCache = () => {
   try {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('wagmi.store')
      const parsedData = JSON.parse(storedData as string)
      if (parsedData?.state?.data) {
        return parsedData.state.data?.account
      }
    }
  } catch (_e) {
    return null
  }
  return null
}
