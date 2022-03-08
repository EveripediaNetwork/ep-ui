import { Collected } from '@/components/Profile/Collected'
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
import { RiHeartLine, RiMenuLine, RiTimer2Line } from 'react-icons/ri'
import { CustomTab } from './CustomTab'

const SECTIONS = [
  { label: 'Collected', icon: TiDocumentAdd, count: 22, component: Collected },
  { label: 'Created', icon: FaPaintRoller, count: 0 },
  { label: 'Favorited', icon: RiHeartLine, count: 6 },
  { label: 'Activity', icon: RiTimer2Line },
]

export const Collections = () => (
  <Tabs alignSelf="self-start" w="full" mt="6">
    <TabList>
      {SECTIONS.map((section, sid) => (
        <CustomTab key={sid} fontWeight="semibold">
          <Icon fontSize="2xl" as={section.icon} mr="3" /> {section.label}{' '}
          {isDefined(section.count) && (
            <chakra.span ml="3" fontWeight="medium" fontSize="sm">
              {section.count}
            </chakra.span>
          )}
        </CustomTab>
      ))}
      <Menu>
        <MenuButton>
          <CustomTab fontWeight="semibold" noTab>
            <Icon fontSize="2xl" as={RiMenuLine} mr="3" /> <span>Offers</span>
            <ChevronDownIcon ml="3" />
          </CustomTab>
        </MenuButton>
        <Portal>
          <MenuList p="0" overflow="hidden">
            <MenuItem
              p="4"
              icon={
                <Icon
                  boxSize={6}
                  strokeWidth="0.5"
                  as={BsArrowDownLeft}
                  fontSize="2xl"
                />
              }
              fontWeight="semibold"
            >
              Offers received
            </MenuItem>
            <Divider />
            <MenuItem
              p="4"
              icon={
                <Icon
                  boxSize={6}
                  strokeWidth="0.5"
                  as={BsArrowUpRight}
                  fontSize="2xl"
                />
              }
              fontWeight="semibold"
            >
              Offers made
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
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
