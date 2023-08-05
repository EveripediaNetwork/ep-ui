import { styles } from '@/theme/styles'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import { PropsWithChildren } from 'react'

type UseThemeProps = {
  resolvedTheme?: 'light' | 'dark'
  setTheme: (theme: string) => void
}

const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { resolvedTheme } = useNextTheme() as UseThemeProps

  const config: ThemeConfig = {
    useSystemColorMode: true,
    initialColorMode: resolvedTheme,
    cssVarPrefix: 'chakra',
  }

  const theme: Dict = extendTheme({
    ...foundations,
    components,
    config,
    semanticTokens,
    styles,
  })

  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NextThemeProvider>
  )
}

export default ThemeProvider
