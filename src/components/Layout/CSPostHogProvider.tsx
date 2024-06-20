import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { env } from '@/env.mjs'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

export const CSPostHogProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <PostHogProvider client={posthog}>
      <PosthogAuthWrapper>{children}</PosthogAuthWrapper>
    </PostHogProvider>
  )
}

function PosthogAuthWrapper({ children }: React.PropsWithChildren<{}>) {
  const { address, chainId } = useAccount()

  useEffect(() => {
    if (address) {
      posthog.identify(address, {
        chainId,
      })
    } else {
      posthog.reset()
    }
  }, [address])

  return <>{children}</>
}
