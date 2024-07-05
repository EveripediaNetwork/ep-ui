import { getUsername } from '@/utils/DataTransform/getUsername'
import { HStack, Link, Text, Box } from '@chakra-ui/react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import ActivityCardTags from './ActivityCardTags'
import { ActivityCardBottomProps } from '@/types/ActivityDataType'
import { useTranslatedTimestamps } from '@/hooks/useTranslatedTimestamps'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import NextLink from 'next/link'

const ActivityCardBottom = (props: ActivityCardBottomProps) => {
  const { editor, isNotifSubCard, lastModTimeStamp, activity, tags } = props
  const lang = useSelector((state: RootState) => state.app.language)
  const translatedTimestamp = useTranslatedTimestamps(
    activity,
    lang,
    lastModTimeStamp ?? '',
  )

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
            as={NextLink}
            href={`/account/${editor.id}`}
            color="brandLinkColor"
            fontWeight="bold"
          >
            {getUsername(editor)}
          </Link>
        </Text>
        <Box display={{ base: 'none', md: 'block' }}>
          <ActivityCardTags tags={tags} />
        </Box>
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
        {translatedTimestamp}
      </Text>
    </HStack>
  )
}

export default ActivityCardBottom
