import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { getUsername } from '@/utils/DataTransform/getUsername'
import { HStack, Link, Text, chakra } from '@chakra-ui/react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import ActivityCardTags from './ActivityCardTags'
import { ActivityCardBottomProps } from '@/types/ActivityDataType'

const ActivityCardBottom = (props: ActivityCardBottomProps) => {
  const { editor, isNotifSubCard, lastModTimeStamp, activity, tags } = props
  return (
    <HStack w="full">
      <HStack flex="1">
        <DisplayAvatar
          address={editor.id}
          avatarIPFS={editor.profile?.avatar}
          size={isNotifSubCard ? 15 : 20}
          alt={editor.profile?.username}
        />
        <Text
          fontSize={{
            base: isNotifSubCard ? '12px' : '12px',
            md: isNotifSubCard ? '12px' : '14px',
          }}
          color="linkColor"
        >
          <Link
            href={`/account/${editor.id}`}
            color="brandLinkColor"
            fontWeight="bold"
          >
            {getUsername(editor)}
          </Link>
        </Text>
        <chakra.div display={{ base: 'none', md: 'block' }}>
          <ActivityCardTags tags={tags} />
        </chakra.div>
      </HStack>
      <Text
        mt="3px"
        fontSize={{
          base: isNotifSubCard ? '12px' : '12px',
          md: isNotifSubCard ? '12px' : '14px',
        }}
        opacity={0.6}
        whiteSpace="nowrap"
      >
        {`${activity === 'Edited' ? activity : 'Created'} ${getReadableDate(
          lastModTimeStamp ?? '',
        )} ago`}
      </Text>
    </HStack>
  )
}

export default ActivityCardBottom
