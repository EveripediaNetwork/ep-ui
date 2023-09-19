import { Text, chakra } from '@chakra-ui/react'
import { ReactNode } from 'react'

const a = ({
  href,
  children,
  ...props
}: {
  href?: string | undefined
  children: ReactNode[]
}) => {
  return (
    <chakra.a
      href={href}
      {...props}
      textDecoration={'underline'}
      color={'gray.600'}
      _dark={{ color: 'whiteAlpha.800' }}
    >
      {children}
    </chakra.a>
  )
}

const p = ({ children }: { children: ReactNode[] }) => (
  <Text noOfLines={3}>{children}</Text>
)

export const postComponent = {
  a,
  p,
}
