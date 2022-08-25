import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'
import { LinkProps } from 'next/link'

export const Link = {
  variants: {
    link: (props: Dict<LinkProps> | StyleFunctionProps) => ({
      color: mode('brandLinkColor', 'brand.700')(props),
    }),
  },
}
