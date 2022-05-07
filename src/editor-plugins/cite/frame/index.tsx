import { store } from '@/store/store'
import { CiteReference } from '@/types/Wiki'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { CiteFromNewURL } from './CiteFromNewURL'
import { CiteFromExistingRefs } from './CiteFromExistingRefs'

const FrameTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    _selected={{
      borderBottom: '1px solid #dbdde5 !important',
      color: '#4ba6f8 !important',
      _dark: {
        bgColor: '#2e3445 !important',
        color: '#4ba6f8 !important',
        borderBottom: '2px solid #4ba6f8 !important',
      },
    }}
    border="unset"
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

  const fetchReferences = () => {
    const fetchedReferences =
      getWikiMetadataById(store.getState().wiki, 'references')?.value || '[]'
    const referencesParsed = JSON.parse(fetchedReferences)
    setReferences(referencesParsed)
    setRefCount(referencesParsed.length)
  }

  useEffect(() => {
    fetchReferences()
  }, [])

  const handleCiteSubmit = (url: string, description: string) => {
    // Dispatch new metadata to wiki slice
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify([
          ...references,
          {
            id: refCount + 1,
            url,
            description,
          },
        ]),
      },
    })

    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${refCount + 1}`,
      refNo: refCount + 1,
    })
    fetchReferences()
  }

  const handleExistingCiteSubmit = (ref: CiteReference) => {
    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${ref.id}`,
      refNo: ref.id,
    })
  }

  return (
    <Tabs>
      <TabList mt={-8} mb={8}>
        <FrameTab>New URL</FrameTab>
        <FrameTab>Add from Existing</FrameTab>
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
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Frame
