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
  const { activeStep, step2Titles, promotedWikis, Data, setValue } = props

  return (
    <>
      {activeStep === 0 && (
        <Text textAlign="center">
          Select the appropriate action you would like to take for this wiki
        </Text>
      )}
      {activeStep === 1 && (
        <VStack gap={4}>
          {step2Titles === 'Promote to Trending wiki' && (
            <Box w="full">
              <Text fontWeight="bold" py="1">
                Select slot
              </Text>
              <Select
                cursor="pointer"
                onChange={(e) => setValue(e.target.value)}
                defaultValue={promotedWikis?.length}
              >
                {promotedWikis &&
                  [...promotedWikis]
                    ?.sort((a, b) => a.promoted - b.promoted)
                    ?.slice(1)
                    ?.map((item, i) => (
                      <option key={i} value={item.promoted}>
                        SLOT {item.promoted - 1} - {item.title}
                      </option>
                    ))}
                {promotedWikis && promotedWikis.length <= 9 && (
                  <option value={promotedWikis && +promotedWikis.length + 1}>
                    New Slot
                  </option>
                )}
              </Select>
            </Box>
          )}
          <GetWiki Data={Data} />
        </VStack>
      )}
      {activeStep === 2 && (
        <>
          {step2Titles === 'Promote to Trending wiki' ? (
            <Text textAlign="center">
              You are about to promote a wiki to the Trending wiki section of
              the homepage. Do you wish to continue this action?
            </Text>
          ) : (
            <Text textAlign="center">
              You are about to promote a wiki to the hero section of the
              homepage. Do you wish to continue this action?
            </Text>
          )}
        </>
      )}
    </>
  )
}

export const PromoteModalContent = (props: ContentProps) => {
  const {
    activeStep,
    steps,
    HompageSelected,
    buttonOne,
    buttonTwo,
    step2Titles,
    promotedWikis,
    Data,
    setValue,
    TrendingwikiSelected,
  } = props
  return (
    <VStack px="5" py="3" gap={4}>
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
              <Box py="10">
                <Content
                  activeStep={activeStep}
                  step2Titles={step2Titles}
                  promotedWikis={promotedWikis}
                  Data={Data}
                  setValue={setValue}
                />
              </Box>
            </Step>
          ))}
        </Steps>
        <Flex width="100%" justify="center" pt={4} pb={5}>
          <HStack gap={3}>
            <Button
              p={4}
              onClick={HompageSelected}
              size="sm"
              variant="ghost"
              fontSize="xs"
            >
              {buttonOne}
            </Button>
            <Button
              size="sm"
              fontSize="xs"
              borderWidth="1px"
              onClick={TrendingwikiSelected}
              disabled={
                !promotedWikis?.length &&
                buttonTwo === 'Promote to Trending wikis'
              }
            >
              {buttonTwo}
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </VStack>
  )
}
