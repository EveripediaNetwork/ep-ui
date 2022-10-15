import { Center } from '@chakra-ui/react'
import React from 'react'
import { RiStarFill, RiTrophyFill } from 'react-icons/ri'

const RankIcon = ({rank, size}: {rank: number, size: string}) => {
    switch (rank) {
      case 0:
        return (
          <Center color="#DD6B20">
            <RiTrophyFill fontSize={size} />
          </Center>
        )
      case 1:
        return (
          <Center color="#D69E2E">
            <RiTrophyFill fontSize={size} />
          </Center>
        )
      case 2:
        return (
          <Center color="thirdRankColor">
            <RiTrophyFill fontSize={size} />
          </Center>
        )
        case -1:
            return (
              null
            )
      default:
        return (
          <Center color="brandLinkColor">
            <RiStarFill fontSize={size} />
          </Center>
        )
    }
}

export default RankIcon
  