import React, { useRef, useState } from 'react'
import {
  Badge,
  Button,
  CloseButton,
  Divider,
  Flex,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
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
  Tag,
} from '@/types/Wiki'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import FlexRow from '../FlexRow/FlexRow'
import { Category } from '@/types/CategoryDataTypes'

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const [tagState, setTagState] = useState({ invalid: false, msg: '' })
  const inputTagRef = useRef<HTMLInputElement>(null)

  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomDivider = () => (
    <GridItem colSpan={2}>
      <Divider />
    </GridItem>
  )

  const handleAddTag = (value: string) => {
    // update previous invalid state
    if (tagState.invalid) setTagState(prev => ({ ...prev, invalid: false }))

    if (value.length === 0) return
    if (value.indexOf(' ') >= 0)
      setTagState({ msg: "Name can't contain blank spaces", invalid: true })

    if (value.length >= 15)
      setTagState({ msg: 'Max length is 15', invalid: true })

    const tag = currentWiki.tags.find(t => t.id === value)
    if (tag) {
      setTagState({ msg: 'Tag already added', invalid: true })
      return
    }

    dispatch({
      type: 'wiki/addTag',
      payload: {
        id: value,
      },
    })
  }

  const handleDeleteTag = (value: string) => {
    const tags = currentWiki.tags.filter(t => t.id !== value)

    dispatch({
      type: 'wiki/setTags',
      payload: tags,
    })
  }

  const disableAddTagButton = () =>
    inputTagRef === null || inputTagRef.current?.value === ''

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
        <GridItem colSpan={2}>
          <Flex direction="column" w="full">
            <Text align="center" mb="2">
              Add up to 5 tags
            </Text>
            <Flex
              mb="3"
              wrap="wrap"
              w="full"
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <InputGroup w="2xs" size="md">
                <Input
                  ref={inputTagRef}
                  isInvalid={tagState.invalid}
                  placeholder="Tag name"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    disabled={disableAddTagButton()}
                    onClick={() => {
                      if (inputTagRef?.current?.value)
                        handleAddTag(inputTagRef.current.value)
                    }}
                    px="3"
                    h="1.75rem"
                    size="sm"
                    variant="outline"
                  >
                    Add
                  </Button>
                </InputRightElement>
              </InputGroup>
              {tagState.invalid ? (
                <Text fontSize="xs" color="red">
                  {tagState.msg}
                </Text>
              ) : null}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            flexDirection="row"
            wrap="wrap"
            justify="space-evenly"
            alignItems="center"
            gridColumn="1/3"
          >
            {currentWiki.tags?.map((c: Tag) => (
              <Badge
                variant="outline"
                display="flex"
                flexDirection="row"
                alignItems="center"
                m="1"
                key={c.id}
                justifyContent="space-between"
              >
                {c.id}
                <CloseButton
                  size="sm"
                  outline="none"
                  onClick={() => handleDeleteTag(c.id)}
                />
              </Badge>
            ))}
          </Flex>
        </GridItem>
        <CustomDivider />
      </SimpleGrid>
    </Modal>
  )
}

export default HighlightsModal
