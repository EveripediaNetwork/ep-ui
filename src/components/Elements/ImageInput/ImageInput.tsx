/* eslint-disable no-useless-escape */
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Flex, Input, useToast, Image as ChakraImg } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { EditorMainImageWrapper } from '../Image/EditorMainImageWrapper'
import ImageCrop from '../Image/ImageCrop'
import { Media } from '@everipedia/iq-utils'

const MAX_MEDIA = 25

type ImageInputType = {
  imageUploading?: boolean
  setHideDropzone?: (hide: boolean) => void
  setImage: (name: string, f: ArrayBuffer) => void
  deleteImage?: () => void
  showFetchedImage: boolean
  modalUpload?: boolean
  media?: Media[]
}

const ImageInput = ({
  imageUploading,
  setHideDropzone,
  setImage,
  deleteImage,
  showFetchedImage,
  modalUpload,
  media,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()
  const [toCropImg, setToCropImg] = useState<ArrayBuffer | string | null>()
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

  const isImgUrl = (url: string) => {
    const img = new Image()
    img.src = url
    return new Promise((resolve) => {
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
    })
  }

  const linkRecognizer = (url: string) => {
    const validYTLinkReg =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

    const validLinkReg = /^(http|https):\/\//

    if (!validLinkReg.test(url)) {
      return { type: null }
    }
    // accomodate for typos in youtube links
    if (/(https?:\/\/)?(www.)?youtu(be\.?c?o?m?|.be)\/?/.test(url)) {
      const videoCode = url.match(validYTLinkReg)
      return { type: 'youtube', value: videoCode?.[1] }
    }
    return { type: 'imageURL' }
  }

  const tryUploadImg = async (url: string) => {
    const imageUrl = url
    const FullUrl = `https://everipedia-cors.vercel.app/?url=${imageUrl}`
    const isImageValid = await isImgUrl(FullUrl)
    if (!isImageValid) {
      removeImage()
      toast({
        title: 'Image could not be fetched. Ensure you have the right link',
        status: 'error',
        duration: 2000,
      })
      return
    }
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

    if (modalUpload) {
      setImage('image', data)
    } else setToCropImg(data)

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
    if (media && media.length >= MAX_MEDIA) {
      toast({
        title: `You cannot upload more than ${MAX_MEDIA} media. You can delete some existing media to create more spaces`,
        status: 'error',
        duration: 3000,
      })
      return
    }
    const url = event.target.value
    const urlType = linkRecognizer(url)
    if (!urlType.type) {
      setImageSrc(undefined)
      toast({
        title: 'Paste a valid image URL',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (urlType.type === 'youtube') {
      if (!urlType.value) {
        setImageSrc(undefined)
        toast({
          title: 'Invalid Youtube URL',
          status: 'error',
          duration: 3000,
        })
        return
      }
      const isVideoUnavailable = await fetch(`/api/checkVideo?url=${url}`)
        .then((res) => res.json())
        .then((data) => data.isUnavailable)
      if (isVideoUnavailable) {
        setImageSrc(undefined)
        toast({
          title: 'Video is unavailable, please check url and try again',
          status: 'error',
          duration: 3000,
        })
        return
      }
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
      } catch (_error) {
        catchImageUploadError()
      }
    }
  }

  return (
    <>
      {toCropImg && (
        <ImageCrop
          imageToCrop={toCropImg}
          setImage={setImage}
          onClose={() => setToCropImg(null)}
          setDisplayImage={setImageSrc}
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
          <EditorMainImageWrapper
            imageUploading={imageUploading}
            cropImage={() => setToCropImg(imgSrc)}
            removeImage={removeImage}
          >
            <ChakraImg
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
            color="wikiDropzoneText"
            onChange={handleOnImageInputChanges}
            placeholder={
              modalUpload
                ? `${t('pasteModalMainImgLabel')}`
                : `${t('pasteMainImgLabel')}`
            }
            _placeholder={{ color: 'wikiDropzoneText' }}
          />
        )}
      </Flex>
    </>
  )
}

export default ImageInput
