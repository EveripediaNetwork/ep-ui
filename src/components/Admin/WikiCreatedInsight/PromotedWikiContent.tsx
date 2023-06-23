import { ContentProps } from '@/types/admin'
import {
  VStack,
  Box,
  Text,
  Select,
  Flex,
  Button,
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { Step, Steps } from 'chakra-ui-steps'
import { GetWiki } from './GetWikisComponent'

export const Content = (props: ContentProps) => {
  const { activeStep, promotedWikis, Data, setValue, value } = props

  return (
    <>
      {activeStep === 0 && (
        <Box w="full">
          <GetWiki Data={Data} />
        </Box>
      )}
      {activeStep === 1 && (
        <VStack gap={4}>
          <Box w="full">
            <Text fontWeight="bold" py="1">
              Select slot
            </Text>
            <Select
              cursor="pointer"
              onChange={(e) => setValue(e.target.value)}
              defaultValue={0}
              width="fit-content"
            >
              {promotedWikis &&
                [...promotedWikis]
                  ?.sort((a, b) => a.promoted - b.promoted)
                  ?.map((item, i) => (
                    <option key={i} value={item.promoted}>
                      SLOT {item.promoted} - {item.title}
                    </option>
                  ))}
              {promotedWikis && promotedWikis.length < 10 && (
                <option value={promotedWikis && promotedWikis.length + 1}>
                  New Slot
                </option>
              )}
            </Select>
          </Box>
          <GetWiki Data={Data} />
        </VStack>
      )}
      {activeStep === 2 && (
        <>
          <Text textAlign="center">
            {`You are about to promote a wiki to slot ${value} of featured wikis,
            on the homepage, Do you wish to continue with this action?`}
          </Text>
        </>
      )}
    </>
  )
}

export const PromoteModalContent = (props: ContentProps) => {
  const {
    activeStep,
    steps,
    Close,
    buttonOne,
    buttonTwo,
    promotedWikis,
    Data,
    value,
    setValue,
    promotion,
    loading,
  } = props
  return (
    <VStack py="3" gap={4}>
      <Text fontSize="xl" textAlign="start" w="100%" fontWeight="bold">
        Promote
      </Text>
      <Flex flexDir="column" width="100%">
        <Steps
          labelOrientation="vertical"
          colorScheme="brand"
          activeStep={activeStep}
          size="sm"
        >
          {steps?.map(({ label, description }) => (
            <Step
              textAlign="left"
              label={label}
              key={label}
              description={description}
            >
              <Box py="5">
                <Content
                  activeStep={activeStep}
                  promotedWikis={promotedWikis}
                  Data={Data}
                  value={value}
                  setValue={setValue}
                />
              </Box>
            </Step>
          ))}
        </Steps>
        <Flex width="100%" justify="center" pt={4}>
          <HStack gap={3}>
            <Button
              py={4}
              px={9}
              onClick={Close}
              size="sm"
              variant="ghost"
              fontSize="xs"
              borderWidth="1px"
              borderColor="modalCloseBtn"
            >
              {buttonOne}
            </Button>
            <Button
              size="sm"
              fontSize="xs"
              onClick={promotion}
              isLoading={loading}
            >
              {buttonTwo}
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </VStack>
  )
}
