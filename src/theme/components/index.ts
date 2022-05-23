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
        left: '50%',
        width: '100px',
        right: '50%',
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
