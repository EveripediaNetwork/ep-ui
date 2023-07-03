import { Text, chakra } from '@chakra-ui/react'
import { Fragment } from 'react'
import ActivityCardTags from './ActivityCardTags'
import { ActivityCardProps } from '@/types/ActivityDataType'

const ActivityCardBody = (props: ActivityCardProps) => {
  const { isNotifSubCard, tags, summary } = props
  return (
    <Fragment>
      <Text
        mt="1"
        noOfLines={{ base: 3, md: 2 }}
        textOverflow="ellipsis"
        overflow="hidden"
        width="100%"
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
