import React from 'react'
import { Button, chakra } from '@chakra-ui/react'
import Link from '@/components/Elements/Link/Link'

const SocialIcon = ({ Icon, link }: { Icon: JSX.Element; link: string }) => (
  <Link target="_blank" href={link} _hover={{ textDecoration: 'none' }}>
    <chakra.span srOnly>{link}</chakra.span>
    <Button size="md" variant="social">
      <chakra.span srOnly>{link}</chakra.span>
      {Icon}
    </Button>
  </Link>
)

export default SocialIcon
