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
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { SupportedLanguages } from '@/data/LanguageData'
import { languageData } from '@/data/LanguageData'
import { usePostHog } from 'posthog-js/react'

interface WikiMainContentProps {
  wiki: Wiki
}

export const MarkdownRender = React.memo(({ wiki }: { wiki: Wiki }) => {
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

const supportedWikiTranslations = languageData
  .filter((lang) => lang.locale !== 'en')
  .map((lang) => lang.locale)
type SupportedWikiTranslations = Exclude<SupportedLanguages, 'en'>
type WikiContentCache = Partial<Record<SupportedWikiTranslations, string>>

const WikiMainContent = ({ wiki: wikiData }: WikiMainContentProps) => {
  const [isTranslating, setIsTranslating] = useState(false)
  const [contentLang, setContentLang] = useState<'en' | 'ko' | 'zh'>('en')
  const [wikiContentState, setWikiContentState] = useState(wikiData.content)
  const cachedWikiTranslation = useRef<WikiContentCache | null>(null)
  const { colorMode } = useColorMode()
  const posthog = usePostHog()
  const locale = useSelector((state: RootState) => state.app.language)

  // const isLocaleWikiTranslationSupported =
  // supportedWikiTranslations.includes(locale) || locale === 'en';

  const isLocaleWikiTranslationSupported =
    locale === 'en' || supportedWikiTranslations.includes(locale)

  const wikiContent = wikiContentState ?? wikiData.content

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
    /* Set content state after wiki content loads
    to allow update of wiki content to translated content */
    setWikiContentState(wikiData.content)
  }, [wikiData.content])

  useEffect(() => {
    /* When the lang changes from one locale to another,
     change wiki content lang to 'en' to prevent entering
     a state that breaks translation btn logic */
    if (isLocaleWikiTranslationSupported) {
      setContentLang('en')
      setWikiContentState(wikiData.content)
    }
  }, [locale])

  const SwitchBtn = ({ btnLocale }: { btnLocale: 'en' | 'ko' | 'zh' }) => {
    const commonStyles = {
      paddingX: 3,
      fontWeight: 'medium',
      fontSize: '14px',
    }

    const activeBtnStyle = {
      bg: 'white',
      color: 'brand.500',
      boxShadow: 'sm',
      _dark: {
        color: 'brand.500',
        bg: 'gray.700',
      },
      _hover: {
        bgcolor: 'gray.700',
        color: 'brand.500',
      },
      _active: {
        bgcolor: 'gray.700',
      },
    }

    const unactiveBtnStyle = {
      color: 'gray.500',
      bgColor: 'transparent',
      _dark: {
        color: 'white',
      },
      _hover: {
        bgColor: 'transparent',
      },
      _active: {
        bgcolor: 'transparent',
      },
    }

    const styles = Object.assign(
      commonStyles,
      btnLocale === contentLang ? activeBtnStyle : unactiveBtnStyle,
    )

    const handleClick = async () => {
      posthog.capture('translate_wiki', {
        wikiId: wikiData.id,
        lang: btnLocale,
      })

      if (btnLocale !== contentLang) {
        if (contentLang === 'en') {
          if (
            cachedWikiTranslation?.current?.[
              btnLocale as SupportedWikiTranslations
            ]
          ) {
            setWikiContentState(
              cachedWikiTranslation.current[
                btnLocale as SupportedWikiTranslations
              ] as string,
            )
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
              lang: btnLocale,
            }),
          })

          if (response.status === 200) {
            const result = await response.json()
            const translatedContent = result.content.join('\n\n')
            setWikiContentState(translatedContent)
            cachedWikiTranslation.current = {
              [locale as SupportedWikiTranslations]: translatedContent,
            }

            setContentLang(btnLocale)
          }
          setIsTranslating(false)
        } else {
          setWikiContentState(wikiData.content)
          setContentLang(btnLocale)
        }
      }
    }

    return (
      <Button onClick={handleClick} sx={styles}>
        {isTranslating && btnLocale !== contentLang ? (
          <Spinner
            size="sm"
            sx={{ color: 'brand.500', _dark: { color: 'white' } }}
          />
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
        width="75%"
      >
        {wikiData.title}
      </Heading>
      {isLocaleWikiTranslationSupported && (
        <Box
          sx={{
            position: { base: 'unset', xl: 'absolute' },
            right: { base: 'unset', xl: 12 },
            top: { base: 'unset', xl: 6 },
            width: '105px',
            marginX: 'auto',
            marginBottom: '26px',
            textAlign: 'center',
            borderColor: 'gray.200',
            borderWidth: '1px',
            borderRadius: 'lg',
            bgColor: 'transparent',
            p: 1.5,
            _dark: {
              borderColor: 'cardBorderColor',
            },
          }}
        >
          <SwitchBtn btnLocale="en" />
          <SwitchBtn btnLocale={locale} />
        </Box>
      )}
      <Box
        className={`${styles.markdownBody} ${
          colorMode === 'dark' && styles.markdownBodyDark
        }`}
      >
        <MarkdownRender wiki={modifiedContentWiki} />
        <WikiFlaggingSystem id={wikiData.id} />
      </Box>
    </Box>
  )
}

export default React.memo(WikiMainContent)
