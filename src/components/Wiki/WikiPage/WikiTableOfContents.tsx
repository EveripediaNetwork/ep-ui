import React, { useEffect, useRef, useState } from 'react'
import {
  VStack,
  useDisclosure,
  IconButton,
  Flex,
  Box,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiMenu3Fill } from 'react-icons/ri'
import { useAppSelector } from '@/store/hook'
import { StaticContent } from '@/components/StaticElement'
import { useRouter } from 'next/router'
import { WikiTableOfContentHeader } from './WikiTableOfContentHeader'

interface WikiTableOfContentsProps {
  isAlertAtTop?: boolean
}

interface TOCItem {
  level: number
  id: string
  title: string
  subChildren?: TOCItem[]
}

function groupArrayByLevel(inputArray: TOCItem[]): TOCItem[] {
  const result: TOCItem[] = []
  const levelMap: Record<number, TOCItem[]> = {}

  inputArray.forEach((item) => {
    const { id, title, level } = item
    const tocItem: TOCItem = { level, id, title }

    if (level === 1) {
      result.push(tocItem)
    } else {
      // Find the correct parent level
      let parentLevel = level - 1
      while (!levelMap[parentLevel] && parentLevel > 1) {
        parentLevel--
      }

      // If parent level found, add it to subChildren
      if (levelMap[parentLevel]) {
        const parentItems = levelMap[parentLevel]
        const parentItem = parentItems[parentItems.length - 1]

        if (!parentItem.subChildren) {
          parentItem.subChildren = []
        }

        parentItem.subChildren.push(tocItem)
      }
    }

    // Update the levelMap
    if (!levelMap[level]) {
      levelMap[level] = []
    }
    levelMap[level].push(tocItem)
  })

  return result
}

const WikiTableOfContents = ({ isAlertAtTop }: WikiTableOfContentsProps) => {
  const toc = useAppSelector((state) => state.toc)
  const { asPath, query, push } = useRouter()

  const { slug } = query

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!(toc.length === 0)) {
      const linkId = asPath.split('#')[1]
      if (linkId) push(`/wiki/${slug}#${linkId}`)
    }
  }, [asPath])

  const { colorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const isDefaultOpen = useBreakpointValue({ base: false, xs: true, xl: false })
  const [activeId, setActiveId] = useState<string | null>()

  // the below ref is used to store all the heading that are in view
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headingElementsRef: any = useRef({})

  useEffect(() => {
    // get all the heading elements
    const headingElements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    )

    // defining callback function for intersection observer
    // this function will be called when the heading element is in view
    // hence when the heading element is in view,
    // we will set the activeId to the id of the heading element
    const callback: IntersectionObserverCallback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // get the id of the heading element that is in view
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement: IntersectionObserverEntry =
          headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id)

      // setting the activeId to the id of the heading element that is in view
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        // if there are multiple heading elements in view then set heading near to top as active
        let closestHeading: IntersectionObserverEntry = visibleHeadings[0]
        visibleHeadings.forEach((headingElement) => {
          if (
            closestHeading === undefined ||
            getIndexFromId(closestHeading.target.id) >
              getIndexFromId(headingElement.target.id)
          ) {
            closestHeading = headingElement
          }
        })
        setActiveId(closestHeading.target.id)
      }
    }

    // creating intersection observer instance and observing the heading elements
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px 0px 0px',
    })
    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId, toc])

  useEffect(() => {
    if (!activeId) setActiveId(toc[0]?.id)
  }, [activeId, toc])

  return (
    <>
      {isOpen === isDefaultOpen ? (
        <VStack
          display={{ base: 'none', xl: 'block' }}
          borderLeftWidth="1px"
          w="20vw"
          px={6}
          py="35px"
          ml="0 !important"
        >
          <VStack
            spacing={4}
            align="start"
            position="sticky"
            // top="calc(70px + 30px + 2px)"
          >
            <Flex w="100%" justify="end">
              <IconButton
                aria-label="Toggle Table of Contents"
                icon={<RiMenu3Fill />}
                onClick={onToggle}
              />
            </Flex>
            <StaticContent>
              <VStack
                as="nav"
                spacing={4}
                h="calc(100vh - (70px + 90px))"
                overflowY="scroll"
                pr={4}
                w="100%"
                align="start"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: colorMode === 'light' ? '#0000002a' : '#3f444e',
                    borderRadius: '24px',
                  },
                }}
              >
                {groupArrayByLevel(toc).map((item) => (
                  <WikiTableOfContentHeader
                    toc={item}
                    key={item.id}
                    activeId={activeId}
                  />
                ))}
              </VStack>
            </StaticContent>
          </VStack>
        </VStack>
      ) : (
        <Box
          display={{ base: 'none', md: 'block' }}
          pos="absolute"
          right="24px"
          top={`calc(70px + ${isAlertAtTop ? '80px' : '32px'})`}
        >
          <IconButton
            aria-label="Toggle Table of Contents"
            icon={<RiMenu3Fill />}
            onClick={onToggle}
          />
        </Box>
      )}
    </>
  )
}

export default React.memo(WikiTableOfContents)
