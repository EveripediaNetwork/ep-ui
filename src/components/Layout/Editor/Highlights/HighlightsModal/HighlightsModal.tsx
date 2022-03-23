import React from 'react'
import {
  Badge,
  CloseButton,
  Divider,
  Flex,
  GridItem,
  ModalProps,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { RiFolder3Fill, RiTranslate2, RiSurveyFill } from 'react-icons/ri'
import slugify from 'slugify'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import Modal from '@/components/Elements/Modal/Modal'
import {
  BaseCategory,
  Languages,
  LanguagesISOEnum,
  MData,
  PageTypeName,
} from '@/types/Wiki'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import FlexRow from '../FlexRow/FlexRow'

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomDivider = () => (
    <GridItem colSpan={2}>
      <Divider />
    </GridItem>
  )

  return (
    <Modal
      title="Edit metadata"
      enableBottomCloseButton
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      {...rest}
    >
      <SimpleGrid columns={2} spacing={2}>
        <Text>Type</Text>
        <Text>Value</Text>

        <CustomDivider />

        <FlexRow>
          <RiFolder3Fill /> <Text>Page Type</Text>
        </FlexRow>

        <Select
          onChange={event => {
            if (event.target.value)
              dispatch({
                type: 'wiki/updateMetadata',
                payload: {
                  id: 'page-type',
                  value: event.target.value,
                },
              })
          }}
          value={String(
            currentWiki.metadata.find((m: MData) => m.id === 'page-type')
              ?.value,
          )}
          placeholder="Choose a page type"
        >
          {Object.values(PageTypeName).map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>

        <CustomDivider />

        <FlexRow>
          <RiSurveyFill /> <Text>Category</Text>
        </FlexRow>

        <Select
          onChange={event => {
            if (event.target.value)
              dispatch({
                type: 'wiki/updateCategories',
                payload: {
                  id: slugify(event.target.value.toLowerCase()),
                  title: event.target.value,
                },
              })
          }}
          placeholder="Choose categories"
        >
          {categoryOptions?.map(o => (
            <option key={o.title}>{o.title}</option>
          ))}
        </Select>

        <Flex
          flexDirection="row"
          wrap="wrap"
          justify="space-evenly"
          alignItems="center"
          gridColumn="1/3"
        >
          {currentWiki.categories
            // ?.filter(item => {
            //   return item.id !== 'first-category'
            // })
            ?.map((c: BaseCategory) => (
              <Badge
                variant="outline"
                display="flex"
                flexDirection="row"
                alignItems="center"
                m="1"
                key={c.title}
                justifyContent="space-between"
              >
                {c.title}
                <CloseButton
                  size="sm"
                  outline="none"
                  onClick={() =>
                    dispatch({
                      type: 'wiki/deleteCategories',
                    })
                  }
                />
              </Badge>
            ))}
        </Flex>
        <CustomDivider />

        <FlexRow>
          <RiTranslate2 /> <Text>Language</Text>
        </FlexRow>
        <Select
          value={currentWiki.language}
          onChange={event =>
            dispatch({
              type: 'wiki/setCurrentWiki',
              payload: { language: event.target.value as LanguagesISOEnum },
            })
          }
          placeholder="Language"
        >
          {Object.keys(Languages).map((o, idx) => (
            <option key={o} value={o}>
              {Object.values(Languages)[idx]}
            </option>
          ))}
        </Select>

        <CustomDivider />
      </SimpleGrid>
    </Modal>
  )
}

export default HighlightsModal
