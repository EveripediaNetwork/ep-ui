import { useAppDispatch } from '@/store/hook'
import { Box, Button, Flex, Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Location from './Location'
import { store } from '@/store/store'
import { CommonMetaIds } from '@everipedia/iq-utils'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'

const LocationInput = () => {
  const dispatch = useAppDispatch()
  const [selectRegion, setSelectedRegion] = useState('')
  const [selectMonth, setSelectMonth] = useState('')
  const [value, setValue] = useState('')

  const metadataValue =
    getWikiMetadataById(store.getState().wiki, CommonMetaIds.LOCATION)?.value ||
    '[]'
  const parsedMetadata = JSON.parse(metadataValue)

  const fetchedLocation = Array.isArray(parsedMetadata)
    ? parsedMetadata
    : [parsedMetadata]

  const handleAddLocation = () => {
    if (selectRegion === '' && value === '' && selectMonth === '') return

    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'location',
        value: JSON.stringify([
          ...fetchedLocation,
          {
            year: selectMonth,
            continent: selectRegion,
            country: value,
          },
        ]),
      },
    })
    setValue('')
    setSelectedRegion('')
    setSelectMonth('')
  }

  return (
    <Stack spacing={'2'}>
      <Text fontWeight="semibold">Location</Text>
      <Flex gap={'10px'}>
        <Box flex={3}>
          <Input
            type="text"
            placeholder="place, country"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
        <Select
          rounded="md"
          maxW={'120px'}
          h="40px"
          value={selectRegion}
          flex={2}
          onChange={(e) => setSelectedRegion(e.target.value)}
          placeholder="Region"
        >
          <option value={'ASIA'}>Asia</option>
          <option value={'AFRICA'}>Africa</option>
          <option value={'AUSTRALIA'}>Australia</option>
          <option value={'EUROPE'}>Europe</option>
          <option value={'NORTH AMERICA'}>North America</option>
          <option value={'SOUTH AMERICA'}>South America</option>
        </Select>
        <Input
          name="date"
          placeholder="Year"
          type="month"
          value={selectMonth}
          flex={1}
          onChange={(e) => {
            setSelectMonth(e.target.value)
          }}
          px={2}
        />
        <Button
          disabled={value === '' && selectRegion === ''}
          h="40px"
          rounded="md"
          onClick={handleAddLocation}
        >
          Add
        </Button>
      </Flex>
      <Location />
    </Stack>
  )
}

export default LocationInput
