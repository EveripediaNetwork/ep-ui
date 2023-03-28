import React from 'react'
import { Tab, Icon, Text, BoxProps } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

export type RankingListButtonProps = {
  label: string
  icon: IconType
} & BoxProps

const RankingListButton = ({
  label,
  icon,
  ...props
}: RankingListButtonProps) => {
  return (
    <Tab
      display="flex"
      alignItems="center"
      color="homeDescriptionColor"
      gap="3"
      _selected={{
        color: 'brandLinkColor',
        borderBottom: '2px solid',
        borderBottomColor: 'brandLinkColor',
      }}
    >
      <Icon
        as={icon}
        w={{ lg: '32px', md: '24px' }}
        h={{ lg: '32px', md: '24px' }}
        color="primaryPinkIcon"
      />
      <Text color="inherit" fontWeight={600} {...props}>
        {label}
      </Text>
    </Tab>
  )
}

export default RankingListButton
