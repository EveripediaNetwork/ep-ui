import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Flex } from '@chakra-ui/react'
import type { MData } from '@everipedia/iq-utils'
import React from 'react'
import LocationItem from './LocationItem'
import { v4 as uuidv4 } from 'uuid'
import type { Location } from './location.type'

const renderLocations = (
  locations: Location | Location[],
  removeLocation: (location: Location) => void,
  handleLocationChange: (location: Location) => void,
) => {
  if (Array.isArray(locations)) {
    return locations.map((item) => (
      <LocationItem
        key={item.id || item.year}
        location={item}
        removeLocation={removeLocation}
        handleLocationChange={() => handleLocationChange(item)}
      />
    ))
  }
  return (
    <LocationItem
      location={locations}
      removeLocation={removeLocation}
      handleLocationChange={() => handleLocationChange(locations)}
    />
  )
}

const LocationList = ({
  handleLocationChange,
}: {
  handleLocationChange: (location: Location) => void
}) => {
  const dispatch = useAppDispatch()
  const metadata = useAppSelector((state) => state.wiki.metadata)
  const locationString = metadata.find((m: MData) => m.id === 'location')?.value
  const parsedLocation = locationString ? JSON.parse(locationString) : ''
  const location = parsedLocation.map((location: Location) => ({
    ...location,
    id: location.id || uuidv4(),
  }))

  const removeLocation = (selectedLocation: Location) => {
    let newLocation = []
    if (Array.isArray(parsedLocation)) {
      newLocation = location.filter(
        (item: Location) => item?.id !== selectedLocation.id,
      )
    } else {
      newLocation = []
    }
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'location',
        value: JSON.stringify(newLocation),
      },
    })
  }

  return (
    <Flex gap={2} flexWrap={'wrap'}>
      {renderLocations(location, removeLocation, handleLocationChange)}
    </Flex>
  )
}

export default LocationList
