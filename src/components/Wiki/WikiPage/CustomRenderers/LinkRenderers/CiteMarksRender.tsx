/* eslint-disable react-hooks/rules-of-hooks */
import { store } from '@/store/store'
import { CiteReference } from '@everipedia/iq-utils'
import {
  HStack,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const CiteMarksRender = ({
  text,
  href,
  referencesString,
}: {
  text: string
  href?: string
  referencesString?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const id = href?.split('#cite-id-')[1]
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const onHashChanged = () => {
      setIsActive(window.location.hash === `#cite-mark-${id}-${count}`)
    }
    window.addEventListener('hashchange', onHashChanged)
    return () => {
      window.removeEventListener('hashchange', onHashChanged)
    }
  }, [count, id])

  useEffect(() => {
    store.dispatch({
      type: 'citeMarks/incCiteCount',
      payload: id,
    })
    const storedCount = store.getState().citeMarks[id || ''] as number
    setCount(storedCount)
  }, [id])

  const references = referencesString ? JSON.parse(referencesString) : []
  const ref = references.find((r: CiteReference) => r.id === id)

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      returnFocusOnClose={false}
      aria-label="Wiki preview"
    >
      <PopoverTrigger>
        <Link
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
          onFocus={() => {}}
          onBlur={() => {}}
          href={href}
          borderRadius="100px"
          color="brandLinkColor"
          _focus={{ outline: 'none', textDecoration: 'underline' }}
        >
          <Text
            as="sup"
            id={`cite-mark-${id}-${count}`}
            scrollMarginTop="50vh"
            bgColor={isActive ? '#e160a12a' : 'transparent'}
            boxShadow={isActive ? '0 0 0 3px #e160a12a' : 'none'}
            borderRadius={2}
            zIndex={-1}
          >
            {text}
          </Text>
        </Link>
      </PopoverTrigger>
      {ref && (
        <PopoverContent
          boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
          _focus={{ outline: 'none' }}
          mx={4}
        >
          <PopoverArrow />
          <PopoverBody>
            <HStack
              flexWrap="wrap"
              gap={1}
              p={1}
              mb={1}
              borderBottomWidth={ref.description.trim().length ? '1px' : 0}
              justify="space-between"
            >
              <Tag colorScheme="blue" size="sm" fontWeight="medium">
                <Link
                  color="#304262 !important"
                  _dark={{
                    color: '#9dcbf0 !important',
                  }}
                  fontSize="sm"
                  p="0 !important"
                  href={ref.url}
                >
                  {new URL(ref.url).hostname}
                </Link>
              </Tag>
              {ref.timestamp && (
                <Text m="2px !important" opacity={0.6} fontSize="sm">
                  {new Date(ref.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </HStack>
            <Text m="2px !important" fontSize="sm">
              {ref.description}
            </Text>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  )
}

export default CiteMarksRender
