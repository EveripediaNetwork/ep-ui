import { STATUS_FILTERS } from '@/components/Profile/SidebarFilter/constants'
import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import {
  AccordionItem,
  SimpleGrid,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
  useStyleConfig,
  chakra,
} from '@chakra-ui/react'
import { StringOrNumber } from '@chakra-ui/utils'
import React from 'react'

type StatusFilterButtonProps = UseCheckboxProps
const StatusFilterButton = (props: StatusFilterButtonProps) => {
  const { value } = props
  const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

  const buttonTheme = useStyleConfig('Button', {
    variant: state.isChecked ? 'solid' : 'outline',
  })

  return (
    <chakra.label
      rounded="lg"
      {...htmlProps}
      sx={{
        ...buttonTheme,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        px: 2,
        borderRadius: 'lg',
        _dark: { borderColor: 'black' },
      }}
    >
      <chakra.input {...getInputProps()} hidden />

      <chakra.span {...getLabelProps()}>{value}</chakra.span>
    </chakra.label>
  )
}

export const StatusFilter = () => {
  const options = Object.values(STATUS_FILTERS)

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  // Useless; it's just here to satisfy the compiler till we handle actual data
  const hide = (a: StringOrNumber[]) => a
  hide(value)

  return (
    <AccordionItem>
      <AccordionButton>Status</AccordionButton>
      <AccordionPanel>
        <SimpleGrid columns={2} spacing="2">
          {options.map(option => (
            <StatusFilterButton
              key={option}
              {...getCheckboxProps({ value: option })}
            />
          ))}
        </SimpleGrid>
      </AccordionPanel>
    </AccordionItem>
  )
}
