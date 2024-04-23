import { env } from '@/env.mjs'
import { useAppDispatch } from '@/store/hook'
import { Button, Flex, Select, Stack, Text } from '@chakra-ui/react'
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

const LocationInput = () => {
  const dispatch = useAppDispatch()
  const [selectRegion, setSelectedRegion] = useState('')
  const {
    init,
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete({ initOnMount: false })

  const handleAddLocation = () => {
    if (selectRegion === '' && value === '') return
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'location',
        value: JSON.stringify({
          continent: selectRegion,
          country: value,
        }),
      },
    })
    setValue('')
    setSelectedRegion('')
  }

  return (
    <Stack spacing={'2'}>
      <Text fontWeight="semibold">Location</Text>
      <Flex gap={'10px'}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
          onReady={init}
        />
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
        <Select
          rounded="md"
          maxW={'160px'}
          h="40px"
          value={selectRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          placeholder="Select Region"
        >
          <option value={'ASIA'}>Asia</option>
          <option value={'AFRICA'}>Africa</option>
          <option value={'AUSTRALIA'}>Australia</option>
          <option value={'EUROPE'}>Europe</option>
          <option value={'NORTH AMERICA'}>North America</option>
          <option value={'SOUTH AMERICA'}>South America</option>
        </Select>
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
