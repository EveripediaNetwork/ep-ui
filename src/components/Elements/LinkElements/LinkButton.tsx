import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

type LinkButtonProps = LinkProps & {
  href: string
  prefetch?: boolean
  children: React.ReactNode
  className?: string
  target?: string
}

const LinkButton = ({
  href,
  prefetch,
  children,
  target,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      href={href as string}
      prefetch={prefetch}
      {...props}
      target={target}
      className={cn('py-4 px-4 lg:px-6 rounded-lg text-xs', props.className)}
    >
      {children}
    </Link>
  )
}

export default LinkButton
