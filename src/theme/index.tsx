import { styles } from '@/theme/styles'
import { extendTheme, ThemeConfig, ChakraProvider } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import {
  ColorMode,
  ColorModeProvider,
  CSSReset,
  PortalManager,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const config: ThemeConfig = {
  // useSystemColorMode: true,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
}

export const chakraTheme: Dict = extendTheme({
  components,
  config,
  ...foundations,
  semanticTokens,
  styles,
})

const CustomChakraProvider = ({ children }: PropsWithChildren<{}>) => {
  const { resolvedTheme, theme } = useNextTheme()

  console.log({ resolvedTheme, theme })

  return (
    <ChakraProvider theme={chakraTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: 'light',
        }}
        value={theme as ColorMode}
      >
        <CSSReset />
        <PortalManager>{children}</PortalManager>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => (
  <NextThemeProvider enableSystem={false}>
    <CustomChakraProvider>{children}</CustomChakraProvider>
  </NextThemeProvider>
)
