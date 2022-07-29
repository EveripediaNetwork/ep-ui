/* eslint-disable no-useless-escape */
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Flex, Image, Input, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { EditorMainImageWrapper } from '../Image/EditorMainImageWrapper'
import ImageCrop from '../Image/ImageCrop'

type ImageInputType = {
  setHideDropzone?: (hide: boolean) => void
  setImage: (name: string, f: ArrayBuffer) => void
  deleteImage?: () => void
  showFetchedImage: boolean
  modalUpload?: boolean
}

const ImageInput = ({
  setHideDropzone,
  setImage,
  deleteImage,
  showFetchedImage,
  modalUpload,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()
  const [toCropImg, setToCropImg] = useState<ArrayBuffer | null>(null)
  const toast = useToast()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const removeImage = useCallback(() => {
    setImageSrc(undefined)
    if (deleteImage && setHideDropzone) {
      setHideDropzone(false)
      deleteImage()
    }
  }, [deleteImage, setHideDropzone])

  const linkRecogniser = (url: string) => {
    const validYTLinkReg =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

    const validLinkReg = /^(http|https):\/\//

    if (!validLinkReg.test(url)) {
      return { type: null }
    }
    if (/(https?:\/\/)?(www.)?youtu(be\.com|.be)\//.test(url)) {
      const videoCode = url.match(validYTLinkReg)
      return { type: 'youtube', value: videoCode && videoCode[1] }
    }
    return { type: 'imageURL' }
  }

  const tryUploadImg = async (url: string) => {
    const imageUrl = url
    const FullUrl = `https://everipedia-cors.vercel.app/?url=${imageUrl}`
    const response = await fetch(FullUrl, {
      method: 'GET',
      headers: {},
    })
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

    setToCropImg(data)

    if (!showFetchedImage) {
      setImageSrc('')
    }
    toast({
      title: 'Image successfully Fetched',
      status: 'success',
      duration: 2000,
    })
  }

  const catchImageUploadError = () => {
    removeImage()
    toast({
      title: 'Image could not be fetched. Ensure you have the right link',
      status: 'error',
      duration: 2000,
    })
  }

  const handleOnImageInputChanges = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const url = event.target.value
    const urlType = linkRecogniser(url)

    if (!urlType) {
      setImageSrc(undefined)
      toast({
        title: 'Paste a valid image URL',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (urlType.type === 'youtube') {
      const videoID = urlType?.value
      dispatch({
        type: 'wiki/addMedia',
        payload: {
          name: videoID,
          size: 0,
          id: `https://www.youtube.com/watch?v=${videoID}`,
          source: 'YOUTUBE',
        },
      })
    }

    setImageSrc(event.target.value)

    if (setHideDropzone) {
      setHideDropzone(true)
    }

    if (urlType.type === 'imageURL') {
      try {
        tryUploadImg(url)
      } catch (error) {
        catchImageUploadError()
      }
    }
  }

  return (
    <>
      {toCropImg && (
        <ImageCrop
          imgArrayBuffer={toCropImg}
          setImage={setImage}
          onClose={() => setToCropImg(null)}
          setImageInput={setImageSrc}
        />
      )}
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
            placeholder={
              modalUpload
                ? `${t('pasteModalMainImgLabel')}`
                : `${t('pasteMainImgLabel')}`
            }
          />
        )}
      </Flex>
    </>
  )
}

export default ImageInput
