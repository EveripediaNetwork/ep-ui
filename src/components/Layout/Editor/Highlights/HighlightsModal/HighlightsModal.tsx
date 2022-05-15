import React from 'react'
import {
  Badge,
  CloseButton,
  Divider,
  Flex,
  GridItem,
  Input,
  ModalProps,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { RiFolder3Line, RiSurveyLine, RiTwitterLine } from 'react-icons/ri'
import slugify from 'slugify'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import Modal from '@/components/Elements/Modal/Modal'
import { BaseCategory, MData, PageTypeName, CommonMetaIds } from '@/types/Wiki'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { useTranslation } from 'react-i18next'
import FlexRow from '../FlexRow/FlexRow'
import Tags from './Tags'

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
  const { t } = useTranslation()
  return (
    <Modal
      SecondaryButton={undefined}
      title=""
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

        {/* ========== Page Type ========== */}
        <FlexRow>
          <RiFolder3Line /> <Text>{`${t('pageTypeLabel')}`}</Text>
        </FlexRow>
        <Select
          onChange={event => {
            if (event.target.value)
              dispatch({
                type: 'wiki/updateMetadata',
                payload: {
                  id: CommonMetaIds.PAGE_TYPE,
                  value: event.target.value,
                },
              })
          }}
          value={String(
            currentWiki.metadata.find(
              (m: MData) => m.id === CommonMetaIds.PAGE_TYPE,
            )?.value,
          )}
        >
          {Object.values(PageTypeName).map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>
        <CustomDivider />

        {/* ========== Categories ========== */}
        <FlexRow>
          <RiSurveyLine />
          <Text>{`${t('categoryTypeLabel')}`}</Text>
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
          placeholder="choose categories"
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
          {currentWiki.categories?.map((c: BaseCategory) => (
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

        {/* ========== Twitter profile ========== */}
        <FlexRow>
          <RiTwitterLine /> <Text>{`${t('twitterProfileLabel')}`}</Text>
        </FlexRow>
        <Input
          onChange={event => {
            if (event.target.value)
              dispatch({
                type: 'wiki/updateMetadata',
                payload: {
                  id: CommonMetaIds.TWITTER_PROFILE,
                  value: event.target.value,
                },
              })
          }}
          placeholder={
            String(
              currentWiki.metadata.find(
                (m: MData) => m.id === CommonMetaIds.TWITTER_PROFILE,
              )?.value,
            )
              ? String(
                  currentWiki.metadata.find(
                    (m: MData) => m.id === CommonMetaIds.TWITTER_PROFILE,
                  )?.value,
                )
              : 'Your Twitter Handle'
          }
        />
        <CustomDivider />
        <Tags />
        <CustomDivider />
      </SimpleGrid>
    </Modal>
  )
}

export default HighlightsModal
