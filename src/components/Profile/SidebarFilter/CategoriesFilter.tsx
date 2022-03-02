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

const CATEGORIES = [
  {
    name: 'Art',
    image: 'https://opensea.io/static/images/icons/art-light.svg',
  },
  {
    name: 'Collectibles',
    image: 'https://opensea.io/static/images/icons/collectibles-light.svg',
  },
  {
    name: 'Domain Names',
    image: 'https://opensea.io/static/images/icons/domain-names-light.svg',
  },
  {
    name: 'Music',
    image: 'https://opensea.io/static/images/icons/music-light.svg',
  },
  {
    name: 'Photography',
    image:
      'https://opensea.io/static/images/icons/photography-category-light.svg',
  },
  {
    name: 'Sports',
    image: 'https://opensea.io/static/images/icons/sports-light.svg',
  },
  {
    name: 'Trading Cards',
    image: 'https://opensea.io/static/images/icons/trading-cards-light.svg',
  },
  {
    name: 'Utility',
    image: 'https://opensea.io/static/images/icons/utility-light.svg',
  },
  {
    name: 'Virtual Worlds',
    image: 'https://opensea.io/static/images/icons/virtual-worlds-light.svg',
  },
]

type CategoryFilterItemProps = UseCheckboxProps

const CategoryFilterItem = (props: CategoryFilterItemProps) => {
  const { value } = props
  const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

  const category = CATEGORIES.find(cat => cat.name === value)

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
        <Avatar
          src={category?.image}
          boxSize="7"
          name={category?.name}
          _hover={{ transform: 'scale(1.2)' }}
          transition="transform .3s ease"
        />
      )}
      <chakra.span ml="2" {...getLabelProps()}>
        {category?.name}
      </chakra.span>
    </chakra.label>
  )
}

export const CategoriesFilter = () => {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  })

  // Useless; it's just here to satisfy the compiler till we handle actual data
  const hide = (a: StringOrNumber[]) => a
  hide(value)

  return (
    <AccordionItem>
      <AccordionButton>Categories</AccordionButton>
      <AccordionPanel>
        <List mt="4" h="72" overflowY="scroll">
          {CATEGORIES.map((category, cid) => (
            <CategoryFilterItem
              key={cid}
              {...getCheckboxProps({ value: category.name })}
            />
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}
