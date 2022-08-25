import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import { TiDocumentAdd } from 'react-icons/ti'
import { RiEdit2Line } from 'react-icons/ri'
import { CustomTab } from './CustomTab'
import UserCreatedWikis from './UserWikis/UserCreatedWikis'
import UserEditedWikis from './UserWikis/UserEditedWikis'

const SECTIONS = [
  { label: 'Wikis', icon: TiDocumentAdd, component: UserCreatedWikis },
  { label: 'Edits', icon: RiEdit2Line, component: UserEditedWikis },
]

export const Collections = () => (
  <Tabs alignSelf="self-start" w="full" mt="6">
    <TabList pl={5}>
      {SECTIONS.map((section, sid) => (
        <CustomTab
          _selected={{
            color: 'brandLinkColor !important',
            _after: {
              background: 'brandLinkColor !important',
            },
          }}
          key={sid}
          fontWeight="semibold"
        >
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
