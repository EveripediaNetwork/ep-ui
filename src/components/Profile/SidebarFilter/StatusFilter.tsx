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
import React from 'react'

const STATUS_FILTERS = {
  BUY_NOW: 'Buy Now',
  ON_AUCTION: 'On Auction',
  NEW: 'New',
  HAS_OFFERS: 'Has Offers',
} as const

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
      <chakra.input {...getInputProps()} w="5" border="solid 10px black" />

      <chakra.span {...getLabelProps()}>{value}</chakra.span>
    </chakra.label>
  )
}

export const StatusFilter = () => {
  const options = Object.values(STATUS_FILTERS)

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  return (
    <AccordionItem>
      <AccordionButton>Status</AccordionButton>
      <AccordionPanel>
        {value.sort().join(' and ')}
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
