import { extendTheme, ThemeConfig, ColorMode } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils/src/types'
import { components } from './components'
import { foundations } from './foundations'
import { semanticTokens } from './semantic-tokens'

export const storageKey = 'chakra-ui-color-mode'
let colorModeInLocalStorage
if (typeof window !== 'undefined') {
  colorModeInLocalStorage = localStorage.getItem(storageKey) as ColorMode
}
const useSystemColorMode = !colorModeInLocalStorage

const config: ThemeConfig = {
  useSystemColorMode,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
}

const theme: Dict = extendTheme({
  components,
  config,
  ...foundations,
  semanticTokens,
})

export default theme
