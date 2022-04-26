import React from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
  Button,
  Center,
  Stack,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine } from 'react-icons/ri'
import { Step, Steps } from 'chakra-ui-steps'
import config from '@/config'
import { useRouter } from 'next/router'

const steps = [
  { label: 'Signed Wiki' },
  { label: 'Sent to Relayer' },
  { label: 'Wiki created' },
]

type WikiProcessType = {
  isOpen: boolean
  onClose: () => void
  activeStep: number
  state: 'loading' | 'error' | undefined
  wikiHash: string | undefined
  txHash: string | undefined
  msg: string
  wikiId: string
}

const WikiProcessModal = ({
  onClose,
  isOpen,
  activeStep,
  state,
  wikiHash,
  txHash,
  msg,
  wikiId,
}: WikiProcessType) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  const router = useRouter()

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="2xl"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <Box p={8}>
          <Flex>
            <Text flex="1" fontSize="lg" fontWeight="bold">
              Transaction Details
            </Text>
            <Icon
              cursor="pointer"
              fontSize="2xl"
              fontWeight="light"
              as={RiCloseLine}
              onClick={onClose}
            />
          </Flex>
          <Flex
            textAlign="center"
            px={10}
            pt={10}
            justifyContent="center"
            direction="column"
          >
            <Center mb="16">
              <Flex flexDir="column" width="100%">
                <Steps
                  state={state}
                  labelOrientation="vertical"
                  colorScheme="pink"
                  activeStep={activeStep}
                >
                  {steps.map(({ label }) => (
                    <Step label={label} key={label} />
                  ))}
                </Steps>
              </Flex>
            </Center>
            <Center p={3} bg="pageBg">
              <Text fontSize="xs" lineHeight="2">
                {msg}
              </Text>
            </Center>
            <Center mt="16">
              <Stack direction="row" spacing={6}>
                <Button
                  onClick={() => {
                    router.push(`/wiki/${wikiId}`)
                  }}
                  fontSize="xs"
                  colorScheme="primary"
                  disabled={!(activeStep === 3 && state === undefined)}
                >
                  View Wiki
                </Button>
                <Button
                  fontSize="xs"
                  fontWeight="semibold"
                  variant="outline"
                  disabled={!wikiHash}
                  onClick={() =>
                    window.open(`${config.pinataBaseUrl}${wikiHash}`)
                  }
                >
                  See on IPFS
                </Button>
                <Button
                  disabled={!(activeStep === 3 && txHash)}
                  onClick={() =>
                    window.open(`${config.blockExplorerUrl}tx/${txHash}`)
                  }
                  variant="link"
                  fontWeight="semibold"
                  size="xs"
                  _hover={{ textDecoration: 'none' }}
                  color="link"
                >
                  View on Block Explorer
                </Button>
              </Stack>
            </Center>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default WikiProcessModal
