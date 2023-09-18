import { Tabs, TabList, TabPanels, TabPanel, Icon } from '@chakra-ui/react'
import React from 'react'
import { TiDocumentAdd } from 'react-icons/ti'
import { RiEdit2Line } from 'react-icons/ri'
import { CustomTab } from './CustomTab'
import UserCreatedWikis from './UserWikis/UserCreatedWikis'
import UserEditedWikis from './UserWikis/UserEditedWikis'
import { Activity } from '@/types/ActivityDataType'

interface CollectionsProps {
  createdWikis: Activity[]
  editedWikis: Activity[]
}

export const Collections = ({
  createdWikis,
  editedWikis,
}: CollectionsProps) => {
  const SECTIONS = [
    {
      label: 'Wikis',
      icon: TiDocumentAdd,
      Component: () => <UserCreatedWikis createdWikis={createdWikis} />,
    },
    {
      label: 'Edits',
      icon: RiEdit2Line,
      Component: () => <UserEditedWikis editedWikis={editedWikis} />,
    },
  ]

  return (
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
            <Icon fontSize="2xl" as={section.icon} mr="3" /> {
              section.label
            }{' '}
          </CustomTab>
        ))}
      </TabList>
      <TabPanels>
        {SECTIONS.map((section, sid) => (
          <TabPanel key={sid} p={{ md: '8', xl: 0 }}>
            <section.Component />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
