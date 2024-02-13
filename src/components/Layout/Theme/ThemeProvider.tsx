import { ThemeProvider } from 'next-themes'

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
