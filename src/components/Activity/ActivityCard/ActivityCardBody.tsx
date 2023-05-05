import { Text, chakra } from '@chakra-ui/react'
import { BaseTag } from '@everipedia/iq-utils'
import { Fragment } from 'react'
import ActivityCardTags from './ActivityCardTags'

interface ActivityCardProps {
  tags: BaseTag[]
  summary: string
  isNotifSubCard?: boolean
  link: string
}

const ActivityCardBody = ({
  isNotifSubCard,
  tags,
  summary,
}: ActivityCardProps) => {
  return (
    <Fragment>
      <Text
        mt="1"
        noOfLines={{ base: 3, md: 2 }}
        textOverflow="ellipsis"
        overflow="hidden"
        fontSize={{
          base: '14px',
          md: isNotifSubCard ? '14px' : '16px',
        }}
      >
        {summary}
      </Text>
      <chakra.div display={{ base: 'block', md: 'none' }}>
        <ActivityCardTags tags={tags} />
      </chakra.div>
    </Fragment>
  )
}

export default ActivityCardBody
