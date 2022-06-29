import React, { ChangeEvent, useCallback, useState } from 'react'
import { Flex, Image, Input, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { EditorMainImageWrapper } from '../Image/EditorMainImageWrapper'

type ImageInputType = {
  setHideDropzone?: (hide: boolean) => void
  setImage: (name: string, f: ArrayBuffer) => void
  deleteImage?: () => void
  showFetchedImage: boolean
}

const ImageInput = ({
  setHideDropzone,
  setImage,
  deleteImage,
  showFetchedImage,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()
  const toast = useToast()
  const { t } = useTranslation()

  const removeImage = useCallback(() => {
    setImageSrc(undefined)
    if (deleteImage && setHideDropzone) {
      setHideDropzone(false)
      deleteImage()
    }
  }, [deleteImage, setHideDropzone])

  const handleOnImageInputChanges = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.value.match(/^(http|https):\/\//)) {
      setImageSrc(undefined)
      toast({
        title: 'Paste a valid image URL',
        status: 'error',
        duration: 3000,
      })
      return
    }
    setImageSrc(event.target.value)
    if (setHideDropzone) {
      setHideDropzone(true)
    }

    try {
      const response = await fetch(
        `https://images.weserv.nl/?url=${event.target.value}`,
        {
          method: 'GET',
          headers: {},
        },
      )
      if (response.status !== 200) {
        removeImage()
        toast({
          title: 'Image could not be fetched. Ensure you have the right link',
          status: 'error',
          duration: 2000,
        })
        return
      }
      const data = await response.arrayBuffer()
      setImage(event.target.value, Buffer.from(data))
      if (!showFetchedImage) {
        setImageSrc('')
      }
      toast({
        title: 'Image successfully Fetched',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      removeImage()
      toast({
        title: 'Image could not be fetched. Ensure you have the right link',
        status: 'error',
        duration: 2000,
      })
    }
  }

  return (
    <Flex
      mt={imgSrc && showFetchedImage ? 0 : -20}
      mb={imgSrc && showFetchedImage ? 0 : 7}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {imgSrc && showFetchedImage ? (
        <EditorMainImageWrapper removeImage={removeImage}>
          <Image
            objectFit="cover"
            h="255px"
            w="full"
            borderRadius={4}
            overflow="hidden"
            bgColor="dimColor"
            src={imgSrc}
            alt="Input"
          />
        </EditorMainImageWrapper>
      ) : (
        <Input
          w="90%"
          textAlign="center"
          value=""
          onChange={handleOnImageInputChanges}
          placeholder={`${t('pasteMainImgLabel')}`}
        />
      )}
    </Flex>
  )
}

export default ImageInput
