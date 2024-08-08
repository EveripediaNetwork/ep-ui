import type { MouseEventHandler } from 'react'

export interface Location {
  id?: string
  year?: string
  country: any
  continent?: string
}

export type TLocationType = {
  location: Location
  removeLocation: (item: Location) => void
  handleLocationChange: MouseEventHandler<HTMLDivElement>
}
