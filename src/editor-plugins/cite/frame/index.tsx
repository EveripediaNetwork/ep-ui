import { store } from '@/store/store'
import { CiteReference, CommonMetaIds } from '@everipedia/iq-utils'
import {
  chakra,
  HTMLChakraProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { getWikiMetadataById } from '@/utils/DataFetching/getWikiFields'
import { CiteFromNewURL } from './CiteFromNewURL'
import { CiteFromExistingRefs } from './CiteFromExistingRefs'

type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

const FrameTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    border="unset"
    _selected={{
      borderBottom: '2px solid  !important',
      color: '#ea3b87 !important',
      _dark: {
        bgColor: '#2e3445 !important',
        color: '#dc6fa6 !important',
        borderBottom: '2px solid #dc6fa6 !important',
      },
    }}
    h="unset !important"
    borderBottom="1px solid #dbdde5 !important"
    borderRadius="0 !important"
    p={8}
    _dark={{
      color: 'white !important',
      borderBottom: '1px solid #2b2f37 !important',
      bgColor: '#212533',
    }}
  >
    {children}
  </Tab>
)

const Frame = ({ editorContext }: { editorContext: PluginContext }) => {
  const { eventEmitter } = editorContext
  const [references, setReferences] = React.useState<CiteReference[]>([])
  const [citedIndicator, setCitedIndicator] = React.useState(false)
  const [refCount, setRefCount] = React.useState(0)
  const [tabIndex, setTabIndex] = React.useState(0)

  const fetchReferences = () => {
    const fetchedReferences =
      getWikiMetadataById(store.getState().wiki, CommonMetaIds.REFERENCES)
        ?.value || '[]'
    const referencesParsed = JSON.parse(fetchedReferences)
    setReferences(referencesParsed)
    setRefCount(referencesParsed.length)
  }

  useEffect(() => {
    fetchReferences()
  }, [])

  const handleCiteSubmit = (url: string, description: string) => {
    // Generate a new unique id
    const newRefId = `${Math.random().toString(36).substring(2, 15)}`

    // Dispatch new metadata to wiki slice
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify([
          ...references,
          {
            id: newRefId,
            url,
            description,
            timestamp: Date.now(),
          },
        ]),
      },
    })

    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${newRefId}`,
      refNo: refCount + 1,
    })
    fetchReferences()
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCitedIndicator(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [citedIndicator])

  const handleExistingCiteSubmit = (ref: CiteReference, index: number) => {
    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${ref.id}`,
      refNo: index,
    })
    setCitedIndicator(true)
  }

  return (
    <Tabs
      index={tabIndex}
      onChange={(index: React.SetStateAction<number>) => setTabIndex(index)}
      pos="relative"
    >
      {citedIndicator && (
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          bgColor="#579f6e2a"
          color="#579f6e !important"
          borderRadius="4px"
          p="2px 10px"
          pos="absolute"
          right="5px"
          top="10px"
        >
          Cited !
        </MotionBox>
      )}
      <TabList mt={-8} mb={8}>
        <FrameTab>New URL</FrameTab>
        <FrameTab>Existing Refs</FrameTab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CiteFromNewURL
            handleCiteSubmit={handleCiteSubmit}
            citedIndicator={citedIndicator}
            setCitedIndicator={setCitedIndicator}
          />
        </TabPanel>
        <TabPanel>
          <CiteFromExistingRefs
            refCount={refCount}
            handleExistingCiteSubmit={handleExistingCiteSubmit}
            references={references}
            setTabIndex={setTabIndex}
            fetchReferences={fetchReferences}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Frame
