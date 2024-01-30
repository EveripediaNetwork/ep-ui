import { CommonMetaIds, Wiki } from '@everipedia/iq-utils'
import { Box, Heading, useColorMode, Button, Spinner } from '@chakra-ui/react'
import React, { useMemo, useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { store } from '@/store/store'
import { addToTOC } from '@/components/Wiki/WikiPage/CustomRenderers/customHeadingRender'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { customLinkRenderer } from './CustomRenderers/customLinkRender'
import { customImageRender } from './CustomRenderers/customImageRender'
import { customTableRenderer } from './CustomRenderers/customTableRender'
import styles from '../../../styles/markdown.module.css'
import { WikiFlaggingSystem } from './WikiFlaggingSystem'

interface WikiMainContentProps {
  wiki: Wiki
}

const MarkdownRender = React.memo(({ wiki }: { wiki: Wiki }) => {
  store.dispatch({
    type: 'citeMarks/reset',
  })
  store.dispatch({
    type: 'toc/reset',
  })

  const referencesString = useMemo(
    () => getWikiMetadataById(wiki, CommonMetaIds.REFERENCES)?.value,
    [wiki],
  )

  if (!wiki.content) return null

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: addToTOC,
        h2: addToTOC,
        h3: addToTOC,
        h4: addToTOC,
        h5: addToTOC,
        h6: addToTOC,
        a: (props) =>
          customLinkRenderer({
            ...props,
            referencesString,
          }),
        img: customImageRender,
        table: customTableRenderer,
      }}
    >
      {wiki.content}
    </ReactMarkdown>
  )
})

interface WikiState {
  title: string
  content: string
}

const WikiMainContent = ({ wiki: wikiData }: WikiMainContentProps) => {
  const [isTranslating, setIsTranslating] = useState(false)
  const [contentLang, setContentLang] = useState<'en' | 'ko'>('en')
  const [wikiState, setWikiState] = useState({
    title: wikiData.title,
    content: wikiData.content,
  })
  const cachedWikiTranslation = useRef<WikiState | null>(null)
  const { colorMode } = useColorMode()

  const wikiTitle = wikiState.title ?? wikiData.title
  const wikiContent = wikiState.content ?? wikiData.content

  let content = wikiContent.replace(/<br( )*\/?>/g, '\n') || ''

  const matchRegex = /\$\$widget\d(.*?\))\$\$/
  content.match(new RegExp(matchRegex, 'g'))?.forEach((match) => {
    const widgetContent = match.match(matchRegex)?.[1]
    if (widgetContent) {
      content = content.replaceAll(match, widgetContent)
    }
  })

  const modifiedContentWiki = { ...wikiData, content }

  useEffect(() => {
    setWikiState({ title: wikiData.title, content: wikiData.content })
  }, [])

  const SwitchBtn = ({ btnLocale }: { btnLocale: 'en' | 'ko' }) => {
    const commonStyles = {
      paddingX: 3,
      fontWeight: 'medium',
      fontSize: '14px',
    }

    const activeBtnStyle = {
      color: 'brand.500',
      bg: 'gray.700',
      _hover: {
        bgcolor: 'gray.700',
      },
      _active: {
        bgcolor: 'gray.700',
      },
    }

    const unactiveBtnStyle = {
      bgColor: 'transparent',
      _hover: {
        color: 'brand.500',
      },
      _active: {
        color: 'brand.100',
      },
    }

    const styles = Object.assign(
      commonStyles,
      btnLocale === contentLang ? activeBtnStyle : unactiveBtnStyle,
    )

    const handleClick = async () => {
      if (btnLocale !== contentLang) {
        if (contentLang === 'en') {
          if (cachedWikiTranslation.current) {
            setWikiState(cachedWikiTranslation.current)
            setContentLang(btnLocale)
            return
          }

          setIsTranslating(true)

          const response = await fetch('/api/translate-wiki', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              title: wikiData.title,
              content: wikiData.content,
            }),
          })

          const data = await response.json()
          const wikiState = {
            title: data.title,
            content: data.content.join('\n\n'),
          }
          setWikiState(wikiState)
          cachedWikiTranslation.current = wikiState
          setContentLang(btnLocale)
          setIsTranslating(false)
        } else {
          setWikiState({
            title: wikiData.title,
            content: wikiData.content,
          })
          setContentLang(btnLocale)
        }
      }
    }

    return (
      <Button onClick={handleClick} sx={styles}>
        {isTranslating && btnLocale !== contentLang ? (
          <Spinner size="sm" color="white" />
        ) : (
          btnLocale.toUpperCase()
        )}
      </Button>
    )
  }

  return (
    <Box
      py={8}
      px={{ base: 4, md: 6, xl: 12 }}
      pr={{ md: 15, xl: 12 }}
      maxW={{ base: '100%', xl: '900px' }}
      mx="auto"
      minH={{ base: 'unset', xl: 'calc(100vh - 70px)' }}
      mb={{ xl: '3rem' }}
      borderColor="rankingListBorder"
      position="relative"
    >
      <Heading
        mb={8}
        display={{
          base: 'none',
          md: 'none',
          xl: 'block',
        }}
      >
        {wikiTitle}
      </Heading>
      <Box
        className={`${styles.markdownBody} ${
          colorMode === 'dark' && styles.markdownBodyDark
        }`}
      >
        <MarkdownRender wiki={modifiedContentWiki} />
        <WikiFlaggingSystem id={wikiData.id} />
      </Box>
      <Box
        position="absolute"
        right={-12}
        top={6}
        borderColor={'cardBorderColor'}
        borderWidth={'1px'}
        borderRadius={'lg'}
        bgColor="transparent"
        p={1.5}
      >
        <SwitchBtn btnLocale="en" />
        <SwitchBtn btnLocale="ko" />
      </Box>
    </Box>
  )
}

export default React.memo(WikiMainContent)
