import useBrainPass from './useBrainPass'

export const useWhiteListValidator = () => {
  const { isUserPassActive } = useBrainPass()

  return {
    userCanEdit: isUserPassActive,
  }
}

export default useWhiteListValidator
