import { TFunction } from 'i18next'

type ComboBoxOption = { id: string; label: string; disabled?: boolean }

export type ComboBoxProps = {
  groupedOptions?: { title: string; options: ComboBoxOption[] }[]
  options?: (string | ComboBoxOption)[]
  defaultSelect?: string
  onSelect?: (selected: string) => void
  placeholder?: string
  t?: TFunction<'wiki', undefined>
  name?: string
  resetTriger?: boolean
}
