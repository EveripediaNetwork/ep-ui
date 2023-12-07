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
      px={{ base: 1, md: 4 }}
      mx={{ base: 1, md: 4 }}
      my={2}
      gap="2"
      _selected={{
        color: 'brandLinkColor',
        borderBottom: '2px solid',
        borderBottomColor: 'brandColor.500',
        outline: 'none',
        backgroundColor: 'brand.50',
      }}
      _dark={{
        _selected: {
          backgroundColor: 'brand.200',
          borderBottomColor: 'brandColor.800',
        },
      }}
    >
      <Icon
        as={icon}
        // w={{ lg: '32px', md: '24px' }}
        w={{ lg: '28px', md: '20px' }}
        // h={{ lg: '32px', md: '24px' }}
        h={{ lg: '28px', md: '20px' }}
        color="primaryPinkIcon"
      />
      <Text color="inherit" fontWeight={600} {...props} whiteSpace={'nowrap'}>
        {label}
      </Text>
    </Tab>
  )
}

export default RankingListButton
