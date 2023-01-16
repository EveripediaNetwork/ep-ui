import React from 'react'
import { useAppDispatch } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { Flex, Text, Select } from '@chakra-ui/react'
import { slugifyText } from '@/utils/slugify'
import { Wiki } from '@everipedia/iq-utils'

const CategoryInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  return (
    <Flex gap="2.5" align="start">
      <Text fontWeight="semibold">Category</Text>
      <Select
        size="sm"
        rounded="md"
        maxW="52"
        ml="auto"
        onChange={event => {
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
        defaultValue={wiki.categories[0]?.id}
        placeholder={wiki.categories.length > 0 ? undefined : 'Select Category'}
      >
        {categoryOptions?.map(o => (
          <option key={o.id} value={o.id}>
            {o.title}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default CategoryInput
