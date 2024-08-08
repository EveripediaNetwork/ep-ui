import type { MouseEventHandler } from 'react'

export type TLocationType = {
  year?: string
  country: string
  removeLocation: (item?: string) => void
  handleLocationChange: MouseEventHandler<HTMLDivElement>
}
