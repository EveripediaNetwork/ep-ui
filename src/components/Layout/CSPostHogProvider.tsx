import { env } from '@/env.mjs'
import { getMagicSDK } from '@/utils/WalletUtils/getMagicSDK'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    person_profiles: 'identified_only',
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
  const { address, chainId, connector } = useAccount()

  const getMagicUserEmail = useCallback(async () => {
    try {
      const magic = getMagicSDK()
      if (magic && address) {
        const magicInfo = await magic.user.getInfo()
        if (address.toLowerCase() === magicInfo.publicAddress?.toLowerCase()) {
          return magicInfo.email
        }
      }
    } catch {
      return null
    }
  }, [address])

  useEffect(() => {
    const identifyUser = async () => {
      if (address) {
        posthog.identify(address, {
          chainId,
          connector: connector?.name,
          email: (await getMagicUserEmail()) || undefined,
        })
      }
    }
    identifyUser()
  }, [address])

  return <>{children}</>
}
