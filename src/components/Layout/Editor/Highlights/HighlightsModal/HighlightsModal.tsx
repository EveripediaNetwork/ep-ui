import React, { useState } from 'react'
import {
  Badge,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Flex,
  GridItem,
  ModalProps,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import {
  RiFolder3Fill,
  RiGobletLine,
  RiTranslate2,
  RiSurveyFill,
} from 'react-icons/ri'
import slugify from 'slugify'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import Modal from '@/components/Elements/Modal/Modal'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import {
  BaseCategory,
  Languages,
  LanguagesISOEnum,
  MData,
  Wiki,
} from '@/types/Wiki'
import FlexRow from '../FlexRow/FlexRow'
import { sampleCategories } from '@/data/CategoriesData'

const pageTypeOptions: Array<string> = [
  'Person',
  'Place / Location',
  'Organization / Company / Institution',
  'Event',
  'List / Ranking',
  'Product / Merchandise',
  'Electronics / Software',
  'Medical / Biology',
  'Creative Work / Art',
  'Science / Academia / Humanities',
  'Other',
  'None',
]

const categoryOptions = sampleCategories.map(c => c.title)

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const [wiki, setWiki] = useState<Wiki>({ ...currentWiki })

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
      content: {
        ...prev.content,
        metadata: prev.content.metadata.map((m: MData) =>
          m.id === ob.id ? { ...m, value: ob.value } : m,
        ),
      },
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

    if (
      !wiki.content.categories.find((c: BaseCategory) => c.title === category)
    )
      setWiki((prev: Wiki) => ({
        ...prev,
        content: {
          ...prev.content,
          images: [...currentWiki.content.images],
          categories: [
            ...prev.content.categories,
            { id: slugify(category.toLowerCase()), title: category },
          ],
        },
      }))
  }

  const handleDeleteCategory = (category: string) => {
    setWiki({
      ...wiki,
      content: {
        ...wiki.content,
        categories: wiki.content.categories.filter(
          (c: BaseCategory) => c.title !== category,
        ),
      },
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
          onChange={event =>
            handleSetWikiMetadata({
              id: 'page-type',
              value: event.target.value,
            })
          }
          value={String(
            wiki.content.metadata.find((m: MData) => m.id === 'page-type')
              ?.value,
          )}
          placeholder="Choose a page type"
        >
          {pageTypeOptions.map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>

        <CustomDivider />

        <FlexRow>
          <RiSurveyFill /> <Text>Category</Text>
        </FlexRow>

        <Select
          onChange={event => handleAddCategory(event.target.value)}
          placeholder="Choose categories"
        >
          {categoryOptions.map(o => (
            <option key={o}>{o}</option>
          ))}
        </Select>

        <Flex
          flexDirection="row"
          wrap="wrap"
          justify="space-evenly"
          alignItems="center"
          gridColumn="1/3"
        >
          {wiki.content.categories.map((c: BaseCategory) => (
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
          <RiGobletLine /> <Text>Adult Content</Text>
        </FlexRow>
        <Checkbox
          defaultChecked={
            getWikiMetadataById(currentWiki, 'adult-content')?.value === true
          }
          onChange={event =>
            handleSetWikiMetadata({
              id: 'adult-content',
              value: event.target.checked,
            })
          }
        />

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
