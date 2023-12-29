import { Text } from '@chakra-ui/react'

export const CustomTextRender: React.FC = (props) => (
  <Text noOfLines={3} {...props} />
)
