import { ColorMode } from '@chakra-ui/color-mode'

type ThemeProps = {
  colorMode: ColorMode
}

export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'base',
  },
  variants: {
    social: ({ colorMode }: ThemeProps) => ({
      bg: colorMode === 'dark' ? 'brand.800' : 'brandLinkColor',
      color: 'white',
      mr: 2,
      mb: 4,
      px: 4,
      py: 6,
      _hover: {
        bg: colorMode === 'dark' ? 'brand.600' : 'brand.700',
      },
      _active: {
        bg: colorMode === 'dark' ? 'brand.700' : 'brand.800',
      },
    }),
    solid: ({ colorMode }: ThemeProps) => ({
      bg: colorMode === 'dark' ? 'brand.800' : 'brandLinkColor',
      color: 'white',
      fontSize: 'md',
      _hover: {
        bg: colorMode === 'dark' ? 'brand.600' : 'brand.700',
      },
      _active: {
        bg: colorMode === 'dark' ? 'brand.700' : 'brand.800',
      },
      px: 10,
    }),
    link: ({ colorMode }: ThemeProps) => ({
      color: colorMode === 'dark' ? 'grey.200' : 'gray.600',
      _hover: { textDecoration: 'none' },
    }),
  },
}
