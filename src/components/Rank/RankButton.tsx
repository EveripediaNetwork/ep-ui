import React from 'react'
import { Tab, Icon, Text } from '@chakra-ui/react'
import { RankingListButtonProps } from '@/types/RankDataTypes'

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
      gap="2"
      _selected={{
        color: 'brandLinkColor',
        borderBottom: '2px solid',
        borderBottomColor: 'brandLinkColor',
        outline: 'none',
      }}
    >
      <Icon
        as={icon}
        w={{ lg: '32px', md: '24px' }}
        h={{ lg: '32px', md: '24px' }}
        color="primaryPinkIcon"
      />
      <Text color="inherit" fontWeight={600} {...props} whiteSpace={'nowrap'}>
        {label}
      </Text>
    </Tab>
  )
}

export default RankingListButton
