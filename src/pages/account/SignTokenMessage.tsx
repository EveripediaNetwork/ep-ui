import {
  Center,
  Heading,
  VStack,
  Text,
  Icon,
  Button,
  HStack,
  Box,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import {
  RiArrowLeftLine,
  RiErrorWarningFill,
  RiSettings4Line,
} from 'react-icons/ri'

interface SignTokenMessageProps {
  error?: string
  reopenSigningDialog: Dispatch<SetStateAction<boolean>>
}

const SignTokenMessage = ({
  error,
  reopenSigningDialog,
}: SignTokenMessageProps) => {
  return (
    <Center p={4} mt="15vh" mb="15vh">
      <VStack>
        <Icon as={RiSettings4Line} fontSize={42} />
        <Heading textAlign="center">Authenticate to continue</Heading>
        <Text pb={4} maxW="380px" textAlign="center">
          To make changes to your profile, authenticate your wallet to continue.
        </Text>
        {error && (
          <Box
            bgColor="cardBg"
            boxShadow="rgb(4 17 29 / 20%) 0px 0px 8px 0px"
            flexDirection="column"
            alignItems="stretch"
            mt="10px"
            maxW="md"
            rounded="lg"
            p={4}
          >
            <HStack justifyContent="space-between">
              <HStack spacing={4}>
                <Center
                  bgColor="dimColor"
                  w="35px"
                  h="35px"
                  borderRadius="full"
                >
                  <Icon as={RiErrorWarningFill} fontSize={25} />
                </Center>
                <Heading fontSize="25px">Notice</Heading>
              </HStack>

              <Button
                variant="link"
                leftIcon={<RiArrowLeftLine />}
                onClick={() => reopenSigningDialog(true)}
              >
                Go back
              </Button>
            </HStack>
            <VStack mt={4}>
              <Text pb={4}>
                Sign the prompt to make changes to your profile page. Rejecting
                the prompt will prevent access to your profile settings page.
              </Text>
              <Button
                variant="outline"
                onClick={() => reopenSigningDialog(true)}
              >
                Try again
              </Button>
            </VStack>
          </Box>
        )}
      </VStack>
    </Center>
  )
}

export default SignTokenMessage
