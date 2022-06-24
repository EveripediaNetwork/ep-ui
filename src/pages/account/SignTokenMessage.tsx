import {
  Center,
  Heading,
  VStack,
  Text,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { RiSettings4Line } from 'react-icons/ri'

interface SignTokenMessageProps {
  error?: string
  reopenSigningDialog: Dispatch<SetStateAction<boolean>>
}

const SignTokenMessage = ({
  error,
  reopenSigningDialog,
}: SignTokenMessageProps) => {
  return (
    <Center p={4} mt="20vh" mb="20vh">
      <VStack>
        <Icon as={RiSettings4Line} fontSize={42} />
        <Heading>Authenticate to continue</Heading>
        <Text pb={4} maxW="380px" textAlign="center">
          To make changes to your profile, authenticate your wallet to continue.
        </Text>
        {error && (
          <Alert
            bgColor="transparent"
            borderWidth="1px"
            flexDirection="column"
            alignItems="stretch"
            mt="10px"
            rounded="lg"
            p={0}
            status="error"
          >
            <HStack p={2} justifyContent="space-between">
              <HStack ml={2}>
                <AlertIcon />
                <AlertTitle color="red.500" fontSize="lg">
                  Authentication Failed
                </AlertTitle>
              </HStack>

              <Button
                variant="outline"
                onClick={() => reopenSigningDialog(true)}
              >
                Try again
              </Button>
            </HStack>
            <AlertDescription
              textAlign="center"
              maxW="md"
              p={4}
              borderTopWidth="1px"
            >
              You must authenticate your wallet to access your profile settings.
              Rejecting the prompt will prevent access. Click on try again to
              continue.
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Center>
  )
}

export default SignTokenMessage
