import React, { useState } from 'react'
import { useConnect, useAccount, Connector } from 'wagmi'
import { Box, Divider, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import ConnectorDetails from '@/components/Layout/WalletDrawer/ConnectorDetails'
import { walletsLogos } from '@/data/WalletData'
import ConnectionErrorModal from './ConnectionErrorModal'
import { useTranslation } from 'next-i18next'
import { ConnectorSignTokenModal } from './ConnectorSignTokenModal'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { usePostHog } from 'posthog-js/react'

interface ConnectorsProps {
  openWalletDrawer?: () => void
  handleRedirect: () => void
}

const Connectors = ({ openWalletDrawer, handleRedirect }: ConnectorsProps) => {
  const { t } = useTranslation('common')
  const { fetchStoredToken } = useWeb3Token()
  const { isConnected: isUserConnected, isConnecting: isUserConnecting } =
    useAccount()

  useAccount({
    onConnect: async () => {
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
  const posthog = usePostHog()

  const { connect, connectors } = useConnect({
    onError: (error) => {
      posthog.capture('login_error', {
        error: error.message,
      })
    },
    onSuccess: (data) => {
      posthog.capture('login_success', {
        address: data.account,
      })
    },
  })

  async function triggerSignToken() {
    const storedToken = await fetchStoredToken()
    if (storedToken) {
      console.warn('Token already exists')
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
