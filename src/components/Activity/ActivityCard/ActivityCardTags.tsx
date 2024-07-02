import { Wrap, Tag, Text } from '@chakra-ui/react'
import { BaseTag } from '@everipedia/iq-utils'
import { LinkWrapper } from '@/components/Elements/LinkElements/LinkWrapper'
import { useTranslation } from 'next-i18next'

const ActivityCardTags = ({ tags }: { tags: BaseTag[] }) => {
  const { t } = useTranslation('wiki')
  return (
    <Wrap spacing={2}>
      {tags?.map((tag, index) => (
        <LinkWrapper href={`/tags/${tag.id}`} key={index}>
          <Tag
            as="a"
            size="sm"
            whiteSpace="nowrap"
            key={index}
            minWidth="0"
            sx={{ p: { base: { padding: 0 } } }}
          >
            <Text px={4}>{t(tag.id)}</Text>
          </Tag>
        </LinkWrapper>
      ))}
    </Wrap>
  )
}

export default ActivityCardTags
