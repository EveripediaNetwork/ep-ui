import { CreatedWikisCount } from '@/types/admin'
import { VStack, Box, Text, Select } from '@chakra-ui/react'
import React from 'react'
import { GetWiki } from './GetWikisComponent'

type ContentProps = {
  activeStep: number
  step2Titles: string
  promotedWikis: CreatedWikisCount[] | undefined
  Data: CreatedWikisCount | undefined
  setValue: (value: React.SetStateAction<string>) => void
}

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
                onChange={e => setValue(e.target.value)}
                defaultValue={promotedWikis?.length}
              >
                {promotedWikis &&
                  [...promotedWikis]
                    ?.sort((a, b) => a.promoted - b.promoted)
                    ?.slice(1)
                    ?.map(item => (
                      <option value={item.promoted}>
                        SLOT {item.promoted - 1} - {item.title}
                      </option>
                    ))}
                {promotedWikis && (
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
