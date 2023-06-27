import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react'

export const Chakra = ({ cookies, children, theme }: any) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export const getServerSideProps = ({ req }: any) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  }
}
