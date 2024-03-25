import { ActivityCardTopProps } from '@/types/ActivityDataType'
import { Flex, HStack, Heading, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const getCategoryAbbr = (id: string) => {
  switch (id) {
    case 'defi':
      return 'Defi'
    case 'people':
      return 'PIC'
    case 'dapps':
      return 'Dapps'
    case 'cryptocurrencies':
      return 'Crypto'
    case 'daos':
      return 'DAOs'
    case 'exchanges':
      return 'Exch'
    case 'nfts':
      return 'Nfts'
    case 'organizations':
      return 'Org'
  }
}

const ActivityCardTop = (props: ActivityCardTopProps) => {
  const { t } = useTranslation('history')
  const { title, activity, category, link } = props
  const router = useRouter()
  return (
    <Flex
      justifyContent="space-between"
      wrap="wrap"
      alignItems="center"
      mb={{ base: 0, md: 2 }}
      width="100%"
    >
      <HStack
        flex="1"
        sx={{
          '@media screen and (max-width: 450px)': {
            maxWidth: '200px',
          },
        }}
      >
        <Heading
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          cursor="pointer"
          letterSpacing="wide"
          fontSize={{ base: 16, md: '18px' }}
          onClick={() => router.push(link)}
          tabIndex={0}
          role="link"
          _groupHover={{
            textDecoration: 'underline',
          }}
        >
          {title}
        </Heading>
        <Text fontSize="xs" color="brandLinkColor" fontWeight="medium">
          {t(activity)}
        </Text>
      </HStack>
      {/* We need to show category abbreviations on mobile,
      and the full title on desktop, so we create
      two links, one for mobile and one for desktop */}
      {category && (
        <Link
          as={NextLink}
          href={`/categories/${category?.id}`}
          color="brandLinkColor"
          fontWeight="bold"
          cursor="pointer"
          fontSize={{ base: '14px', lg: '16px' }}
          display={{ base: 'none', md: 'unset' }}
        >
          {category?.title ? category?.title : category?.id}
        </Link>
      )}
      {category && (
        <Link
          as={NextLink}
          href={`/categories/${category?.id}`}
          color="brandLinkColor"
          fontWeight="bold"
          cursor="pointer"
          fontSize={{ base: '14px', lg: '16px' }}
          display={{ base: 'block', md: 'none' }}
        >
          {category?.title ? getCategoryAbbr(category?.id) : category?.id}
        </Link>
      )}
    </Flex>
  )
}

export default ActivityCardTop
