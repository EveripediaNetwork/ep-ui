import { InfoIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertTitle,
  Box,
  CloseButton,
  Spacer,
  Text,
  Stack,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { RiArrowRightLine } from 'react-icons/ri'

const Disclaimer = () => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })
  const router = useRouter()
  return isVisible ? (
    <Box p={3} mx="auto" mb={3} mt={2} w="97%">
      <Alert
        bg="disclaimerBg"
        border="1px solid"
        borderColor="disclaimerBorder"
        borderRadius="md"
        color="brandLinkColor"
      >
        <InfoIcon
          mr={4}
          alignSelf="flex-start"
          position="relative"
          right={-1}
          mt={1}
        />
        <Box>
          <AlertTitle>Disclaimer</AlertTitle>
          <Text width="97%" my={2}>
            Note that in order to publish this wiki, you are required to have a
            BrainPass. The BrainPass grants you access to certain features and
            privileges, including the ability to publish and contribute to wikis
            on IQ.Wiki. If you do not have a BrainPass, you will need to obtain
            one before proceeding with the publication of this wiki.
          </Text>
          <Stack
            onClick={() => router.push('/mint-pass')}
            cursor="pointer"
            direction="row"
            alignItems="center"
            justifyContent="start"
          >
            <Text>Learn More</Text>
            <Icon as={RiArrowRightLine} />
          </Stack>
        </Box>
        <Spacer />
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    </Box>
  ) : null
}

export default Disclaimer
