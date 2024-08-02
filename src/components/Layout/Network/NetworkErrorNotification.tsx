import React from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
  Button,
  useToast,
} from '@chakra-ui/react'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'

interface NetworkErrorNotificationProps {
  modalState: boolean
  setModalState: (state: boolean) => void
  setNetworkSwitchAttempted: (state: boolean) => void
  targetChainId: `0x${string}`
}

const NetworkErrorNotification: React.FC<NetworkErrorNotificationProps> = ({
  modalState,
  setModalState,
  setNetworkSwitchAttempted,
  targetChainId,
}) => {
  const cancelRef = React.useRef(null)
  const { chain } = useNetwork()
  const toast = useToast()
  const { switchNetwork, chains } = useSwitchNetwork({
    onSuccess: () => {
      toast({
        title: 'Chain successfully switched 🎊',
        status: 'success',
      })
      setModalState(false)
      setNetworkSwitchAttempted(true)
    },
    onError: (error) => {
      setModalState(false)
      setNetworkSwitchAttempted(true)
      toast({
        title: `Error switching chain: ${error.message}`,
        status: 'error',
      })
    },
  })

  const targetChain = chains.find((c) => BigInt(c.id) === BigInt(targetChainId))
  const targetChainName = targetChain?.name || 'the correct network'

  const handleSwitchNetwork = () => {
    switchNetwork?.(parseInt(targetChainId, 16))
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        setModalState(false)
        setNetworkSwitchAttempted(true)
      }}
      isOpen={modalState}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent width={{ base: '90%', lg: '100%' }}>
        <Box p={8}>
          <Flex>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiErrorWarningFill}
              mr={5}
            />
            <Text flex="1" fontSize="xl" fontWeight="black">
              Switch Network
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => {
                setModalState(false)
                setNetworkSwitchAttempted(true)
              }}
            />
          </Flex>
          <Text mt="6" w="90%" lineHeight="2">
            Your wallet is currently connected to{' '}
            {chain?.name || 'an unsupported network'}. To continue, please
            switch the network in your wallet to {targetChainName}.
          </Text>
          <Flex mt="6">
            <Text
              onClick={() => {
                setModalState(false)
                setNetworkSwitchAttempted(true)
              }}
              color="primary"
              cursor="pointer"
              pt={2}
              flex="1"
              fontSize="sm"
              fontWeight="bold"
            >
              Dismiss
            </Text>
            <Button onClick={handleSwitchNetwork} variant="outline">
              Switch Network
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NetworkErrorNotification
