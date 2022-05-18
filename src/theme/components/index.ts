import { StepsStyleConfig } from 'chakra-ui-steps'
import { ChakraTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Input } from './Input'
import { Link } from './Link'

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props: StyleFunctionProps) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      connector: {
        ...StepsStyleConfig.baseStyle(props).connector,
        // your custom styles here
        marginLeft: '75px',
        width: '100px',
      },
    }
  },
}

export const components: ChakraTheme['components'] = {
  Avatar,
  Button,
  Input,
  Link,
  Steps: CustomSteps,
}
