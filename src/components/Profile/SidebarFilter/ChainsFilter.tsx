import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import { CheckIcon } from '@chakra-ui/icons'
import {
  AccordionItem,
  Avatar,
  chakra,
  Circle,
  List,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
} from '@chakra-ui/react'
import { StringOrNumber } from '@chakra-ui/utils'
import React from 'react'

const CHAINS = [
  {
    name: 'Ethereum',
    image: 'https://opensea.io/static/images/logos/ethereum.png',
  },
  {
    name: 'Polygon',
    image: 'https://opensea.io/static/images/logos/polygon.svg',
  },
  {
    name: 'Klatyn',
    image: 'https://opensea.io/static/images/logos/klaytn.png',
  },
]

type ChainFilterItemProps = UseCheckboxProps

const ChainFilterItem = (props: ChainFilterItemProps) => {
  const { value } = props
  const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

  const chain = CHAINS.find(ch => ch.name === value)

  const checkIcon = (
    <Circle size={7} borderWidth={1}>
      <CheckIcon color="blue" />
    </Circle>
  )

  return (
    <chakra.label
      {...htmlProps}
      cursor="pointer"
      px="2"
      py="1"
      display="flex"
      alignItems="center"
    >
      <chakra.input {...getInputProps()} />
      {state.isChecked ? (
        checkIcon
      ) : (
        <Avatar src={chain?.image} boxSize="7" name={chain?.name} />
      )}
      <chakra.span ml="2" {...getLabelProps()}>
        {chain?.name}
      </chakra.span>
    </chakra.label>
  )
}

export const ChainsFilter = () => {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  // Useless; it's just here to satisfy the compiler till we handle actual data
  const hide = (a: StringOrNumber[]) => a
  hide(value)

  return (
    <AccordionItem>
      <AccordionButton>Chains</AccordionButton>
      <AccordionPanel>
        <List mt="4" h="72" overflowY="scroll">
          {CHAINS.map((chain, cid) => (
            <ChainFilterItem
              key={cid}
              {...getCheckboxProps({ value: chain.name })}
            />
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}
