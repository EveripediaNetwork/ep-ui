import React from 'react'

import { SettingsIcon } from '@chakra-ui/icons'
import {
  Flex,
  chakra,
  IconButton,
  ButtonGroup,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react'
import { FaShareAlt } from 'react-icons/fa'
import { useProfileContext } from '@/components/Profile/utils'

export type LoadingProfileProps = { hide?: boolean }

export const LoadingProfile = (props: LoadingProfileProps) => {
  const { hide } = props
  const { headerIsSticky } = useProfileContext()
  const isSticky = headerIsSticky && hide

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
          <SkeletonCircle
            mt="-64px"
            boxSize="32"
            borderWidth={2}
            borderColor="white"
            justifySelf="center"
            {...(isSticky && { mt: 0, boxSize: 12 })}
          />

          <Skeleton>
            <chakra.span
              fontSize={isSticky ? '2xl' : '3xl'}
              fontWeight="semibold"
              letterSpacing="tighter"
            >
              Unnamed
            </chakra.span>
          </Skeleton>
        </Flex>
        <chakra.span display="flex" flex="1">
          <ButtonGroup isAttached variant="outline" ml="auto" my="6">
            <IconButton
              mr="-px"
              boxSize="12"
              aria-label="Share"
              icon={<FaShareAlt />}
              rounded="xl"
              _hover={{ shadow: 'xl' }}
            />
            <IconButton
              boxSize="12"
              aria-label="Settings"
              icon={<SettingsIcon />}
              rounded="xl"
              _hover={{ shadow: 'xl' }}
            />
          </ButtonGroup>
        </chakra.span>
      </Flex>

      {!isSticky && (
        <Flex mt="2" gap="3" direction="column" px="6" w="full" align="center">
          <Flex align="center" gap="2" color="gray.500">
            <Skeleton>
              <chakra.span fontWeight="medium">userName</chakra.span>
            </Skeleton>
          </Flex>
          <Skeleton>
            <chakra.span color="gray.500">Joined November 2020</chakra.span>
          </Skeleton>
        </Flex>
      )}
    </>
  )
}
