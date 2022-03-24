import React from 'react'

import { CheckIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Flex,
  chakra,
  IconButton,
  Button,
  Text,
  useClipboard,
  ButtonGroup,
  Tooltip,
  TooltipProps,
  Avatar,
} from '@chakra-ui/react'
import { FaEthereum, FaShareAlt } from 'react-icons/fa'
import { useProfileContext } from '@/components/Profile/utils'
import { useEnsAvatar, useEnsLookup } from 'wagmi'
import { useRouter } from 'next/router'

export type UserDetailsProps = { hide?: boolean }

export const UserDetails = (props: UserDetailsProps) => {
  const { hide } = props
  const router = useRouter()
  const { profile } = router.query

  const { headerIsSticky, ensAccount } = useProfileContext()
  const { data, loading } = ensAccount

  const [{ data: userName }] = useEnsLookup({
    address: data?.address,
    // address: '0x9fEAB70f3c4a944B97b7565BAc4991dF5B7A69ff',
  })

  const [{ data: userAvatar }] = useEnsAvatar({
    addressOrName: profile as string,
    // addressOrName: '0x9fEAB70f3c4a944B97b7565BAc4991dF5B7A69ff',
  })

  const ethAddress = data?.address

  const { hasCopied, onCopy } = useClipboard(ethAddress || '')
  const isSticky = headerIsSticky && hide

  const tooltipProps: Partial<TooltipProps> = {
    placement: 'top',
    hasArrow: true,
    rounded: 'md',
    fontWeight: 'semibold',
    fontSize: 'md',
    px: 3,
    py: 2,
  }

  if (loading) return null
  return (
    <>
      <Flex align="center" justify="space-between" w="full" px="6">
        <chakra.span flex="1" />

        <Flex
          direction={isSticky ? 'row' : 'column'}
          align="center"
          gap="3"
          flex="1"
          justifyContent="center"
        >
          <Avatar
            mt="-64px"
            boxSize="32"
            overflow="hidden"
            borderWidth={2}
            borderColor="white"
            justifySelf="center"
            src={userAvatar as string}
            name={userName as string}
            {...(isSticky && { mt: 0, boxSize: 12 })}
          />

          <chakra.span
            fontSize={isSticky ? '2xl' : '3xl'}
            fontWeight="semibold"
            letterSpacing="tighter"
          >
            {userName || 'Unnamed'}
          </chakra.span>
        </Flex>
        <chakra.span display="flex" flex="1">
          <ButtonGroup isAttached variant="outline" ml="auto" my="6">
            <Tooltip label="Share" {...tooltipProps}>
              <IconButton
                mr="-px"
                boxSize="12"
                aria-label="Share"
                icon={<FaShareAlt />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
              />
            </Tooltip>
            <Tooltip label="Settings" {...tooltipProps}>
              <IconButton
                boxSize="12"
                aria-label="Settings"
                icon={<SettingsIcon />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
              />
            </Tooltip>
          </ButtonGroup>
        </chakra.span>
      </Flex>

      {!isSticky && (
        <Flex gap="3" direction="column" px="6" w="full" align="center">
          <Flex align="center" gap="2" color="gray.500">
            <chakra.span fontWeight="medium">{userName}</chakra.span>
            <Button
              variant="outline"
              rounded="full"
              color="gray.500"
              h="fit-content"
              leftIcon={<FaEthereum />}
              p="2"
              onClick={onCopy}
              rightIcon={hasCopied ? <CheckIcon color="green" /> : undefined}
            >
              <Text w="24" isTruncated>
                {ethAddress}
              </Text>
            </Button>
          </Flex>
          <chakra.span color="gray.500">Joined November 2020</chakra.span>
        </Flex>
      )}
    </>
  )
}
