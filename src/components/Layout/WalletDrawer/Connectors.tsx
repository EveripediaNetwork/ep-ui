import React, { useState } from 'react'
import { useConnect, useAccount, Connector, useAccountEffect } from 'wagmi'
import { Box, Divider, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import ConnectorDetails from '@/components/Layout/WalletDrawer/ConnectorDetails'
import { walletsLogos } from '@/data/WalletData'
import { logEvent } from '@/utils/googleAnalytics'
import { env } from '@/env.mjs'
import ConnectionErrorModal from './ConnectionErrorModal'
import { useTranslation } from 'next-i18next'
import { ConnectorSignTokenModal } from './ConnectorSignTokenModal'
import { useWeb3Token } from '@/hooks/useWeb3Token'

interface ConnectorsProps {
  openWalletDrawer?: () => void
  handleRedirect: () => void
}

const Connectors = ({ openWalletDrawer, handleRedirect }: ConnectorsProps) => {
  const { t } = useTranslation('common')
  const { fetchStoredToken } = useWeb3Token()
  const { isConnected: isUserConnected, isConnecting: isUserConnecting } =
    useAccount()

  useAccountEffect({
    onConnect: async (data) => {
      if (data.connector.switchChain) {
        document.cookie = 'SWITCH_CHAIN=true;'
      } else {
        document.cookie = 'SWITCH_CHAIN=false'
      }
      await triggerSignToken()
    },
  })

  const {
    isOpen: isErrorModalOpen,
    onOpen: openErrorModal,
    onClose: closeErrorModal,
  } = useDisclosure()
  const {
    isOpen: isSignTokenModalOpen,
    onOpen: openSignTokenModal,
    onClose: closeSignTokenModal,
  } = useDisclosure()
  const [connectorName, setConnectorName] = useState('')

  const { connect, connectors } = useConnect({
    mutation: {
      onError: (error) => {
        logEvent({
          action: 'LOGIN_ERROR',
          label: error.message,
          value: 0,
          category: 'login_status',
        })
      },
      onSuccess: (data) => {
        logEvent({
          action: 'LOGIN_SUCCESS',
          label: data.accounts[0],
          value: 1,
          category: 'login_status',
        })
        openSignTokenModal()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any
        w.gtag('config', env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          user_id: data.accounts[0],
        })
      },
    },
  })

  async function triggerSignToken() {
    const storedToken = await fetchStoredToken()
    if (storedToken) {
      console.error('Token already exists')
      closeSignTokenModal()
      handleRedirect()
      return
    }
    openSignTokenModal()
  }

  const handleNetworkConnection = async ({
    connector,
  }: {
    connector: Connector
  }) => {
    if (connector.id) {
      connect({ connector })
      return
    }

    setConnectorName(connector.name)
    openErrorModal()
  }

  const tooltipText = t('loginToolTip')

  return (
    <>
      {!isUserConnected && (
        <Text mb="4" mt={2} color="fadedText2" fontWeight="bold" fontSize="sm">
          {t('loginConnectorText1')}
          <Tooltip
            hasArrow
            borderRadius={8}
            placement="bottom-end"
            textAlign="center"
            p={3}
            fontWeight="bold"
            color="white"
            bg="toolTipBg"
            label={tooltipText}
          >
            <Text
              display="inline"
              cursor="help"
              fontWeight="bold"
              color="brandLinkColor"
            >
              {t('loginConnectorText2')}
            </Text>
          </Tooltip>
          {t('loginConnectorText3')}
        </Text>
      )}
      <Box justifyContent="center" alignItems="center">
        <Box
          border="1px"
          borderColor="walletDrawerBorderColor"
          borderRadius="lg"
          overflow="hidden"
        >
          {connectors.map((connector, index) => (
            <Box key={connector.id} w="full">
              <ConnectorDetails
                connect={handleNetworkConnection}
                connector={connector}
                imageLink={`/images/logos/${walletsLogos[index]}`}
                loading={isUserConnecting}
              />
              {index < walletsLogos.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>

        <ConnectionErrorModal
          connector={connectorName}
          isOpen={isErrorModalOpen}
          onClose={closeErrorModal}
        />
        <ConnectorSignTokenModal
          isOpen={isSignTokenModalOpen}
          onClose={closeSignTokenModal}
          openWalletDrawer={openWalletDrawer}
          handleRedirect={handleRedirect}
        />
      </Box>
    </>
  )
}

export default Connectors
