import React, { useState } from 'react'
import {
  Badge,
  Button,
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
  Wiki,
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
  const [wiki, setWiki] = useState<Wiki>({ ...currentWiki })
  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  const SecondaryButton = (
    <Button
      onClick={() => {
        dispatch({
          type: 'wiki/setCurrentWiki',
          payload: wiki,
        })
        onClose()
      }}
    >
      Submit
    </Button>
  )

  const handleSetWikiMetadata = (ob: MData) => {
    setWiki((prev: Wiki) => ({
      ...prev,
      metadata: prev.metadata.map((m: MData) =>
        m.id === ob.id ? { ...m, value: ob.value } : m,
      ),
    }))
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomDivider = () => (
    <GridItem colSpan={2}>
      <Divider />
    </GridItem>
  )

  const handleAddCategory = (category: string) => {
    if (!category) return

    if (!wiki.categories.find((c: BaseCategory) => c.title === category))
      setWiki((prev: Wiki) => ({
        ...prev,
        images: [...currentWiki.images],
        categories: [
          ...prev.categories,
          { id: slugify(category.toLowerCase()), title: category },
        ],
      }))
  }

  const handleDeleteCategory = (category: string) => {
    setWiki({
      ...wiki,
      categories: wiki.categories.filter(
        (c: BaseCategory) => c.title !== category,
      ),
    })
  }

  return (
    <Modal
      title="Edit metadata"
      enableBottomCloseButton
      SecondaryButton={SecondaryButton}
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
              handleSetWikiMetadata({
                id: 'page-type',
                value: event.target.value,
              })
          }}
          value={String(
            wiki.metadata.find((m: MData) => m.id === 'page-type')?.value,
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
            if (event.target.value) handleAddCategory(event.target.value)
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
          {wiki.categories.map((c: BaseCategory) => (
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
                onClick={() => handleDeleteCategory(c.title)}
              />
            </Badge>
          ))}
        </Flex>
        <CustomDivider />

        <FlexRow>
          <RiTranslate2 /> <Text>Language</Text>
        </FlexRow>
        <Select
          value={wiki.language}
          onChange={event =>
            setWiki({
              ...wiki,
              language: event.target.value as LanguagesISOEnum,
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
