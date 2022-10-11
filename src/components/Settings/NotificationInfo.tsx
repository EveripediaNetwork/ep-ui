import React from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'

const NotificationInfo = ({
  openSwitch,
  setOpenSwitch,
}: {
  openSwitch: boolean
  setOpenSwitch: (status: boolean) => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setOpenSwitch(false)}
      isOpen={openSwitch}
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
              Notifications
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => setOpenSwitch(false)}
            />
          </Flex>
          <Text textAlign="center" my="10" lineHeight="2">
            Notification settings is under development and will be available to
            you soon.
          </Text>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NotificationInfo
