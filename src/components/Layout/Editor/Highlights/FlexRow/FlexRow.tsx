import React, { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

const FlexRow = ({ children }: { children: ReactNode }) => (
  <Flex
    direction="row"
    justifyContent="flex-start"
    justifySelf="center"
    alignSelf="center"
    alignItems="center"
    gap="8px"
    w="140px"
    h="30px"
  >
    {children}
  </Flex>
)

export default FlexRow
