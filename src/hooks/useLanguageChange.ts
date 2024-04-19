import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setLanguage } from '@/store/slices/app-slice'
import { logEvent } from '@/utils/googleAnalytics'
import { isString } from '@chakra-ui/utils'
import { setCookie } from 'cookies-next'

const useLanguageChange = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLangChange = (userLang: string | string[]) => {
    if (isString(userLang)) {
      dispatch(setLanguage(userLang))
      setCookie('NEXT_LOCALE', userLang, {
        maxAge: 60 * 60 * 24 * 365.25 * 100,
      })
      const { pathname, asPath, query } = router
      router.replace({ pathname, query }, asPath, { locale: userLang })
      logEvent({
        action: 'CHANGE_PLATFORM_LANGUAGE',
        category: 'language',
        label: userLang,
        value: 1,
      })
    }
  }

  return { handleLangChange }
}

export default useLanguageChange
