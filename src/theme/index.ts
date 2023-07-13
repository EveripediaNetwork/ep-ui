import { styles } from '@/theme/styles'
import { Dict } from '@chakra-ui/utils'
import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { UseThemeProps } from '@/pages/theme'

export const { resolvedTheme } = useTheme() as UseThemeProps

const colorModeConfig: ThemeConfig = {
  initialColorMode: resolvedTheme,
  useSystemColorMode: true, // change to false disable system-color-select
  cssVarPrefix: 'chakra',
}

const theme: Dict = extendTheme({
  components,
  colorModeConfig,
  ...foundations,
  semanticTokens,
  styles,
})

export default theme
