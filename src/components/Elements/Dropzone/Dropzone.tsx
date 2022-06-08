import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { RiCloseLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'

import config from '@/config'
import { useTranslation } from 'react-i18next'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { CreateNewWikiSlug } from '@/types/Wiki'
import { Image } from '../Image/Image'

type DropzoneType = {
  dropZoneActions: {
    setHideImageInput: (hide: boolean) => void
    setImage: (f: ArrayBuffer) => void
    deleteImage: () => void
    isToResetImage: boolean
    initialImage: string | undefined
  }
}

const Dropzone = ({ dropZoneActions }: DropzoneType) => {
  const { t } = useTranslation()
  const [paths, setPaths] = useState<Array<string>>([])
  const toast = useToast()
  const { data: accountData } = useAccount()
  const {
    setHideImageInput,
    isToResetImage,
    setImage,
    deleteImage,
    initialImage,
  } = dropZoneActions

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPaths(acceptedFiles.map(file => URL.createObjectURL(file)))

      acceptedFiles.forEach((f: File) => {
        const reader = new FileReader()

        reader.onload = () => {
          const binaryStr = Buffer.from(reader.result as Buffer)

          // validate image
          const fileSize = binaryStr.byteLength / 1024 ** 2
          if (fileSize > 10) {
            toast({
              title: 'File size is larger than 8mb',
              status: 'error',
              duration: 3000,
            })
            setHideImageInput(false)
            setPaths([])
            return
          }

          // set image to state
          setImage(binaryStr as ArrayBuffer)
        }

        reader.readAsArrayBuffer(f)
      })
      setHideImageInput(true)
    },
    [setHideImageInput, setImage, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg, image/png, image/jpg, image/webp',
  })

  useEffect(() => {
    if (initialImage) {
      setHideImageInput(true)
      setPaths([`${config.pinataBaseUrl}${initialImage}`])
    }
  }, [initialImage, setHideImageInput])

  useEffect(() => {
    if (isToResetImage) {
      const draftWiki = getDraftFromLocalStorage(CreateNewWikiSlug)
      if (draftWiki?.image?.length === 0) {
        deleteImage()
        setHideImageInput(false)
        setPaths([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToResetImage, setHideImageInput])

  return (
    <Box>
      {paths.length === 0 ? (
        <Box
          display="flex"
          padding="10px"
          border="1px"
          borderColor="borderColor"
          borderStyle="dashed"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          maxH="345px"
          minH="300px"
          _hover={{
            boxShadow: 'md',
            borderColor: 'brand.400',
          }}
          {...getRootProps()}
        >
          <input disabled={!accountData?.address} {...getInputProps()} />
          {isDragActive ? (
            <Text textAlign="center">Drop the files here ...</Text>
          ) : (
            <Text textAlign="center" opacity="0.5" maxW="xs">
              {`${t('dragMainImgLabel')}`}
            </Text>
          )}
        </Box>
      ) : (
        <Flex direction="column" w="full" h="full" justify="center">
          {paths.map(path => (
            <Image
              mx="auto"
              priority
              h="255px"
              w="full"
              borderRadius={4}
              overflow="hidden"
              key={path}
              src={path}
              alt="highlight"
            />
          ))}
          <Button
            w="25%"
            fontWeight="bold"
            fontSize="20px"
            m="auto"
            mt="5px"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setPaths([])
              setHideImageInput(false)
              deleteImage()
            }}
          >
            <RiCloseLine />
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default Dropzone
