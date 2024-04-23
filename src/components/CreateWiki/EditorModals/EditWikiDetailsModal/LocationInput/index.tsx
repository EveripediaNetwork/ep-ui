import { env } from '@/env.mjs'
import { useAppDispatch } from '@/store/hook'
import { Box, Button, Flex, Input, Select, Stack, Text } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import Script from 'next/script'
import React, { useState } from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete'
import Location from './Location'
import { store } from '@/store/store'
import { CommonMetaIds } from '@everipedia/iq-utils'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'

const LocationInput = () => {
  const dispatch = useAppDispatch()
  const [selectRegion, setSelectedRegion] = useState('')
  const [selectMonth, setSelectMonth] = useState('')
  const {
    init,
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete({ initOnMount: false })

  const metadataValue =
    getWikiMetadataById(store.getState().wiki, CommonMetaIds.LOCATION)?.value ||
    '[]'
  const parsedMetadata = JSON.parse(metadataValue)

  // Check if parsedMetadata is an array, if not, wrap it in an array.
  const fetchedLocation = Array.isArray(parsedMetadata)
    ? parsedMetadata
    : [parsedMetadata]

  const handleAddLocation = () => {
    if (selectRegion === '' && value === '' && selectMonth === '') return

    console.log({
      year: selectMonth,
      continent: selectRegion,
      country: value,
    })
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
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
          onReady={init}
        />
        <Box flex={3}>
          <AutoComplete
            onSelectOption={(option) => {
              setValue(option.item.originalValue)
            }}
            rollNavigation
          >
            <AutoCompleteInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              h="40px"
              placeholder="Enter event location"
              disabled={!ready}
            />
            <div className="relative">
              <AutoCompleteList>
                {status === 'OK' &&
                  data.map(({ place_id, description }) => {
                    return (
                      <AutoCompleteItem key={place_id} value={description}>
                        {description}
                      </AutoCompleteItem>
                    )
                  })}
              </AutoCompleteList>
            </div>
          </AutoComplete>
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
