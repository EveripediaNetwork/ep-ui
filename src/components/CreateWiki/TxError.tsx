import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Flex,
} from '@chakra-ui/react'

type TxError = {
  opened: boolean
  title: string
  description: string
}

type TxErrorProps = {
  txError: TxError
  setTxError: (txError: TxError) => void
}

const TxErrorAlert = ({ txError, setTxError }: TxErrorProps) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {txError.opened && (
        <Alert status="error" maxW="md" mb="3">
          <AlertIcon />
          <AlertTitle>{txError.title}</AlertTitle>
          <AlertDescription>{txError.description}</AlertDescription>
          <CloseButton
            onClick={() =>
              setTxError({
                title: '',
                description: '',
                opened: false,
              })
            }
            position="absolute"
            right="5px"
          />
        </Alert>
      )}
    </Flex>
  )
}

export default TxErrorAlert
