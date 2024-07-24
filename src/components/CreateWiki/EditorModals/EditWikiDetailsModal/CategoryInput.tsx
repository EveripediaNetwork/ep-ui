import React from 'react'
import { useAppDispatch } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { Flex, Text } from '@chakra-ui/react'
import { slugifyText } from '@/utils/textUtils'
import { Wiki } from '@everipedia/iq-utils'
import { useTranslation } from 'next-i18next'
import ComboBoxPopup from './ComboBoxPopup'

const CategoryInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const { data: categoryOptions } = useGetCategoriesLinksQuery()
  const { t } = useTranslation('wiki')

  const handleSelect = (selected?: string) => {
    const selectedOption = categoryOptions?.find((el) => el.title === selected)
    if (selectedOption) {
      dispatch({
        type: 'wiki/updateCategories',
        payload: {
          id: slugifyText(selectedOption.id),
          title: selectedOption.title,
        },
      })
    } else {
      dispatch({
        type: 'wiki/deleteCategories',
      })
    }
  }

  const defaultSelect = categoryOptions?.find(
    (el) => el.id === wiki.categories[0]?.id,
  )?.title

  return (
    <Flex gap="2.5" align="start" justify="space-between">
      <Text fontWeight="semibold">{t('category')}</Text>
      <ComboBoxPopup
        options={categoryOptions?.map((el) => el.title)}
        defaultSelect={defaultSelect}
        onSelect={handleSelect}
        placeholder={t('selectCategory')}
        t={t}
      />
    </Flex>
  )
}

export default CategoryInput
