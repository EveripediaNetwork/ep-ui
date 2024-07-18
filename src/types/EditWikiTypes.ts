import { TFunction } from 'i18next'
import { Dispatch, SetStateAction } from 'react'

type ComboBoxOption = { id: string; label: string }

export type ComboBoxProps = {
  groupedOptions?: { title: string; options: ComboBoxOption[] }[]
  options?: string[]
  selected?: string
  setSelected: Dispatch<SetStateAction<any>>
  placeholder: string
  t?: TFunction<'wiki', undefined>
}
