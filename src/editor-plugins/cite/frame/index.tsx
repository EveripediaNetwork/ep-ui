import { store } from '@/store/store'
import { CiteReference, CommonMetaIds } from '@/types/Wiki'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { CiteFromNewURL } from './CiteFromNewURL'
import { CiteFromExistingRefs } from './CiteFromExistingRefs'

const FrameTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    border="unset"
    _selected={{
      borderBottom: '2px solid #4ba6f8 !important',
      color: '#4ba6f8 !important',
      _dark: {
        bgColor: '#2e3445 !important',
        color: '#4ba6f8 !important',
        borderBottom: '2px solid #4ba6f8 !important',
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

  const handleExistingCiteSubmit = (ref: CiteReference, index: number) => {
    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${ref.id}`,
      refNo: index + 1,
    })
  }

  return (
    <Tabs
      index={tabIndex}
      onChange={(index: React.SetStateAction<number>) => setTabIndex(index)}
    >
      <TabList mt={-8} mb={8}>
        <FrameTab>New URL</FrameTab>
        <FrameTab>Existing Refs</FrameTab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CiteFromNewURL handleCiteSubmit={handleCiteSubmit} />
        </TabPanel>
        <TabPanel>
          <CiteFromExistingRefs
            refCount={refCount}
            handleExistingCiteSubmit={handleExistingCiteSubmit}
            references={references}
            setTabIndex={setTabIndex}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Frame
