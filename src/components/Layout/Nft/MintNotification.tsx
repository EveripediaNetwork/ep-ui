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
  Spacer,
  Image,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const MintNotification = ({
  modalState,
  setModalState,
  header,
  body,
}: {
  modalState: boolean
  setModalState: (state: boolean) => void
  header: string
  body: string
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  const router = useRouter()
  const {address} = useAccount()
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setModalState(false)}
      isOpen={modalState}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent width={{ base: '90%', lg: '100%' }}>
        <Box p={8}>
          <Flex>
            <Spacer />
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => setModalState(false)}
            />
          </Flex>
          <Image src="/images/nft-pass/success.gif" alt="success" />
          <Text mt="5" fontSize="xl" textAlign="center">
            {header}
          </Text>
          <Text fontSize="sm" mt="5" textAlign="center">
            {body}
          </Text>
          <Flex my="5" justifyContent="center">
            <Button onClick={() => router.push(`/account/${address}?tab=brainpass`)}>View BrainPass</Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MintNotification
