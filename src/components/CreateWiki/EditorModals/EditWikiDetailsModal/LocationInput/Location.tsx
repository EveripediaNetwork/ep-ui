import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Flex } from '@chakra-ui/react'
import { MData } from '@everipedia/iq-utils'
import React from 'react'
import LocationItem from './LocationItem'

interface Location {
  year?: string
  country: any
}

const renderLocations = (
  locations: Location | Location[],
  removeLocation: (year: string) => void,
) => {
  if (Array.isArray(locations)) {
    return locations.map((item, index) => (
      <LocationItem
        key={item.year || index}
        year={item.year}
        country={item.country}
        removeLocation={removeLocation}
      />
    ))
  } else if (locations.year || locations.country) {
    return (
      <LocationItem
        year={locations.year}
        country={locations.country}
        removeLocation={removeLocation}
      />
    )
  }
}

const Location = () => {
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
      {renderLocations(location, removeLocation)}
    </Flex>
  )
}

export default Location
