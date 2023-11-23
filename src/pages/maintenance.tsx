import { Logo } from '@/components/Elements'
import { Heading, Text, VStack } from '@chakra-ui/react'

const maintenance = () => {
  return (
    <VStack minH="80vh" justifyContent="center" alignItems="center" p={4}>
      <Logo boxSize={20} />
      <Heading fontSize={30}>Under Maintainance</Heading>
      <Text fontSize={18} textAlign="center">
        We are currently under maintainance, please check back later.
      </Text>
    </VStack>
  )
}

export default maintenance
