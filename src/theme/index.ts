import { styles } from '@/theme/styles'
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'

const config: ThemeConfig = {
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
  useSystemColorMode: false,
}

const theme: Dict = extendTheme({
  components,
  config,
  ...foundations,
  semanticTokens,
  styles,
})

export default theme
