import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import theme from '@/theme'

export type UseThemeProps = {
  resolvedTheme?: 'light' | 'dark'
  setTheme: (theme: string) => void
}

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  // remove enableSystem to disable system-color-select
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NextThemeProvider>
  )
}
