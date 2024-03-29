import React from 'react'
import { useAppDispatch } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { Flex, Text, Select } from '@chakra-ui/react'
import { slugifyText } from '@/utils/textUtils'
import { Wiki } from '@everipedia/iq-utils'
import { useTranslation } from 'next-i18next'

const CategoryInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const { data: categoryOptions } = useGetCategoriesLinksQuery()
  const { t } = useTranslation('wiki')

  return (
    <Flex gap="2.5" align="start">
      <Text fontWeight="semibold">{t('category')}</Text>
      <Select
        size="sm"
        rounded="md"
        maxW="52"
        ml="auto"
        onChange={(event) => {
          if (event.target.value) {
            dispatch({
              type: 'wiki/updateCategories',
              payload: {
                id: slugifyText(event.target.value),
                title: event.target.value,
              },
            })
          } else {
            dispatch({
              type: 'wiki/deleteCategories',
            })
          }
        }}
        value={wiki.categories[0]?.id}
        placeholder={
          wiki.categories.length > 0 ? undefined : t('selectCategory')
        }
      >
        {categoryOptions?.map((o) => (
          <option key={o.id} value={o.id}>
            {t(o.title)}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default CategoryInput
