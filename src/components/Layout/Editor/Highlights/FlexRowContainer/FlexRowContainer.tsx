import React, { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

const FlexRowContainer = ({ children }: { children: ReactNode }) => (
  <Flex
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    w="full"
    wrap="nowrap"
  >
    {children}
  </Flex>
)

export default FlexRowContainer
