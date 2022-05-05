import Collected from '@/components/Profile/Collected'
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import { FaPaintRoller } from 'react-icons/fa'
import { TiDocumentAdd } from 'react-icons/ti'
import { CustomTab } from './CustomTab'

const SECTIONS = [
  { label: 'Wikis', icon: TiDocumentAdd, component: Collected },
  { label: 'NFTs', icon: FaPaintRoller },
]

export const Collections = () => (
  <Tabs alignSelf="self-start" w="full" mt="6">
    <TabList>
      {SECTIONS.map((section, sid) => (
        <CustomTab key={sid} fontWeight="semibold">
          <Icon fontSize="2xl" as={section.icon} mr="3" /> {section.label}{' '}
        </CustomTab>
      ))}
    </TabList>

    <TabPanels>
      {SECTIONS.map((section, sid) => (
        <TabPanel key={sid} p="0">
          <chakra.div as={section.component} />
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
)
