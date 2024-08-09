import Link, { type LinkProps } from 'next/link'

type LinkWrapperProps = LinkProps & {
  children: React.ReactNode
}

export const LinkWrapper = ({ href, prefetch, children }: LinkWrapperProps) => {
  const shouldPrefetch =
    !(
      String(href).includes('/create-wiki') || String(href).includes('/about')
    ) && prefetch

  return (
    <Link href={href} prefetch={shouldPrefetch} passHref legacyBehavior>
      {children}
    </Link>
  )
}
