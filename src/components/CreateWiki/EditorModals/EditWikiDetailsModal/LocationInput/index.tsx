import { useAppDispatch } from '@/store/hook'
import { Box, Button, Flex, Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Location from './Location'
import { store } from '@/store/store'
import { CommonMetaIds } from '@everipedia/iq-utils'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { v4 as uuidv4 } from 'uuid'

const LocationInput = () => {
  const dispatch = useAppDispatch()
  const [selectRegion, setSelectedRegion] = useState('')
  const [selectMonth, setSelectMonth] = useState('')
  const [value, setValue] = useState('')
  const [locationId, setLocationId] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [location, setLocation] = useState<Location[]>([])

  useEffect(() => {
    const metadataValue =
      getWikiMetadataById(store.getState().wiki, CommonMetaIds.LOCATION)
        ?.value || '[]'
    const parsedMetadata = JSON.parse(metadataValue)
    const fetchedLocation = Array.isArray(parsedMetadata)
      ? parsedMetadata
      : [parsedMetadata]

    const updatedLocations = fetchedLocation.map((location: Location) => ({
      ...location,
      id: location.id || uuidv4(),
    }))
    setLocation(updatedLocations)
  }, [])

  const handleAddLocation = () => {
    if (selectRegion === '' && value === '' && selectMonth === '') return

    if (locationId !== '' || isEditing) {
      const newLocations = location.map((loc: Location) =>
        loc.id === locationId
          ? {
              ...loc,
              year: selectMonth,
              continent: selectRegion,
              country: value,
            }
          : loc,
      )
      dispatch({
        type: 'wiki/updateMetadata',
        payload: {
          id: 'location',
          value: JSON.stringify(newLocations),
        },
      })
      setValue('')
      setSelectedRegion('')
      setSelectMonth('')
      setLocationId('')
      setIsEditing(false)
      return
    }

    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'location',
        value: JSON.stringify([
          ...location,
          {
            id: uuidv4(),
            year: selectMonth,
            continent: selectRegion,
            country: value,
          },
        ]),
      },
    })
    setValue('')
    setIsEditing(false)
    setSelectedRegion('')
    setSelectMonth('')
  }

  const handleLocationChange = (location: Location) => {
    setLocationId(location.id || '')
    setIsEditing(true)
    setValue(location.country)
    setSelectedRegion(String(location.continent))
    setSelectMonth(location.year || '')
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
          {locationId !== '' || isEditing ? 'Update' : 'Add'}
        </Button>
      </Flex>
      <Location handleLocationChange={handleLocationChange} />
    </Stack>
  )
}

export default LocationInput
