import config from '@/config'
import useBrainPass from './useBrainPass'

export const useWhiteListValidator = () => {
  const { isUserPassActive } = useBrainPass()

  return {
    userCanEdit: config.isProduction === 'true' ? isUserPassActive : true,
  }
}

export default useWhiteListValidator
