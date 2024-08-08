import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Flex } from '@chakra-ui/react'
import type { MData } from '@everipedia/iq-utils'
import React from 'react'
import LocationItem from './LocationItem'

interface Location {
  id?: string
  year?: string
  country: any
  continent?: string
}

const renderLocations = (
  locations: Location | Location[],
  removeLocation: (year?: string) => void,
  handleLocationChange: (location: Location) => void,
) => {
  if (Array.isArray(locations)) {
    return locations.map((item) => (
      <LocationItem
        key={item.id || item.year}
        year={item.year}
        country={item.country}
        removeLocation={removeLocation}
        handleLocationChange={() => handleLocationChange(item)}
      />
    ))
  }
  if (locations.year || locations.country) {
    return (
      <LocationItem
        year={locations.year}
        country={locations.country}
        removeLocation={removeLocation}
        handleLocationChange={() => handleLocationChange(locations)}
      />
    )
  }
}

const Location = ({
  handleLocationChange,
}: {
  handleLocationChange: (location: Location) => void
}) => {
  const dispatch = useAppDispatch()
  const metadata = useAppSelector((state) => state.wiki.metadata)
  const locationString = metadata.find((m: MData) => m.id === 'location')?.value
  const parsedLocation = locationString ? JSON.parse(locationString) : ''
  const location = parsedLocation

  const removeLocation = (year?: string) => {
    let newLocation = []
    if (Array.isArray(parsedLocation)) {
      newLocation = location.filter(
        (item: { year: string | undefined }) => item?.year !== year,
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

export default Location
