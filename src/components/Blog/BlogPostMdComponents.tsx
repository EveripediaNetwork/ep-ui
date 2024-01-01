import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

const p = ({ children }: { children: ReactNode[] }) => (
  <Text noOfLines={3}>{children}</Text>
)

export const postComponent = {
  p,
}
