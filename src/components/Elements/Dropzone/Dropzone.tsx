import React, { useCallback, useEffect, useState } from 'react'
import { AspectRatio, Box, Text, useToast } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { useAccount } from 'wagmi'

import config from '@/config'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { useDispatch } from 'react-redux'
import { EditorMainImageWrapper } from '../Image/EditorMainImageWrapper'
import { Image } from '../Image/Image'

type DropzoneType = {
  dropZoneActions: {
    setHideImageInput?: (hide: boolean) => void
    setImage: (name: string, f: ArrayBuffer) => void
    deleteImage?: () => void
    isToResetImage?: boolean
    initialImage?: string | undefined
    showFetchedImage: boolean
    textType: string
  }
}

const Dropzone = ({ dropZoneActions }: DropzoneType) => {
  const [paths, setPaths] = useState<Array<string>>([])
  const toast = useToast()
  const dispatch = useDispatch()
  const { data: accountData } = useAccount()
  const {
    setHideImageInput,
    isToResetImage,
    setImage,
    deleteImage,
    initialImage,
    showFetchedImage,
    textType,
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
              title: 'File size is larger than 10mb',
              status: 'error',
              duration: 3000,
            })
            if (setHideImageInput) setHideImageInput(false)
            setPaths([])
            return
          }

          // set image to state
          setImage(f.name, binaryStr as ArrayBuffer)
        }

        reader.readAsArrayBuffer(f)
      })
      if (setHideImageInput) {
        setHideImageInput(true)
      }
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
      const path = `${config.pinataBaseUrl}${initialImage}`
      if (setHideImageInput) {
        setHideImageInput(true)
      }
      setPaths([path])
    }
  }, [initialImage, setHideImageInput])

  useEffect(() => {
    if (isToResetImage) {
      const draftWiki = getDraftFromLocalStorage()
      if (!draftWiki || draftWiki?.image?.length === 0) {
        dispatch({
          type: 'wiki/setInitialWikiState',
          payload: {
            image: undefined,
          },
        })
        if (setHideImageInput) setHideImageInput(false)
        setPaths([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToResetImage, setHideImageInput])

  return (
    <Box>
      {paths.length === 0 || !showFetchedImage ? (
        <AspectRatio ratio={4 / 3}>
          <Box
            display="flex"
            padding="10px"
            border="1px"
            borderColor="borderColor"
            borderStyle="dashed"
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            h="full"
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
              <Box px="8" mb={!showFetchedImage ? '10' : '1'}>
                <Text textAlign="center" opacity="0.5">
                  Drag and drop a <b>{textType}</b>, or click to select.
                </Text>
                <Text textAlign="center" opacity="0.5" fontWeight="bold">
                  (10mb max)
                </Text>
              </Box>
            )}
          </Box>
        </AspectRatio>
      ) : (
        <>
          {showFetchedImage && (
            <EditorMainImageWrapper
              removeImage={() => {
                setPaths([])
                if (setHideImageInput && deleteImage) {
                  setHideImageInput(false)
                  deleteImage()
                }
              }}
            >
              <Image
                objectFit="cover"
                h="255px"
                w="full"
                borderRadius={4}
                priority
                overflow="hidden"
                src={paths[0]}
                alt="Input"
              />
            </EditorMainImageWrapper>
          )}
        </>
      )}
    </Box>
  )
}

export default Dropzone
