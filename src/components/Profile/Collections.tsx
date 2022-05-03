import Collected from '@/components/Profile/Collected'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Divider,
} from '@chakra-ui/react'
import { isDefined } from '@chakra-ui/utils'
import React from 'react'
import { BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs'
import { FaPaintRoller } from 'react-icons/fa'
import { TiDocumentAdd } from 'react-icons/ti'
import { RiMenuLine } from 'react-icons/ri'
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
