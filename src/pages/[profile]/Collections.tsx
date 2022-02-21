import { CustomTab } from '@/pages/[profile]/CustomTab'
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  chakra,
} from '@chakra-ui/react'
import { isDefined } from '@chakra-ui/utils'
import React from 'react'
import { FaHeart, FaPaintRoller } from 'react-icons/fa'
import { RiHeartLine, RiMenuLine, RiTimer2Line } from 'react-icons/ri'

const SECTIONS = [
  { label: 'Collections', icon: FaHeart, count: 22 },
  { label: 'Created', icon: FaPaintRoller, count: 0 },
  { label: 'Favorited', icon: RiHeartLine, count: 6 },
  { label: 'Activity', icon: RiTimer2Line },
  { label: 'Offers', icon: RiMenuLine },
]

export const Collections = () => (
  <Tabs alignSelf="self-start">
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
    </TabList>

    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
)
