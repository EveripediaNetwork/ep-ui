/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'
import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import 'react-image-crop/dist/ReactCrop.css'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { RiCropLine } from 'react-icons/ri'

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: mediaWidth * 0.8,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const canvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop,
) => {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}

interface ImageCropProps {
  imageToCrop: ArrayBuffer | string
  onClose: () => void
  setImage: (name: string, f: ArrayBuffer) => void
  setDisplayImage: (url: string) => void
}

const ImageCrop = ({
  imageToCrop,
  onClose,
  setImage,
  setDisplayImage,
}: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>()
  const previewCropRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const [initialDisplayImageUrl, setInitialDisplayImageUrl] = useState<string>()
  const [isInitialImageLoaded, setIsInitialImageLoaded] = useState(false)
  const toast = useToast()

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (crop) return
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, WIKI_IMAGE_ASPECT_RATIO))
    setIsInitialImageLoaded(true)
  }

  const handleImageCrop = () => {
    if (!previewCropRef.current || !crop) return

    setSaving(true)
    const canvas = document.createElement('canvas')
    canvasPreview(previewCropRef.current, canvas, crop)
    canvas.toBlob(b => {
      if (b) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(b)
        reader.onload = () => {
          if (reader.result) {
            setDisplayImage(URL.createObjectURL(b))
            setImage('image', reader.result as ArrayBuffer)
            setSaving(false)
            onClose()
          }
        }
      } else {
        if (!toast.isActive('image-crop-error')) {
          toast({
            id: 'image-crop-error',
            title: 'Cannot crop image',
            description:
              'Try selecting a different area of image or upload a new image',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
        setSaving(false)
      }
    }, 'image/jpeg')
  }

  useEffect(() => {
    if (typeof imageToCrop !== 'string') {
      setTimeout(() => {
        const url = URL.createObjectURL(
          new Blob([imageToCrop], { type: 'image/jpeg' }),
        )
        setInitialDisplayImageUrl(url)
      }, 500)
    } else {
      setInitialDisplayImageUrl(imageToCrop)
    }
  }, [imageToCrop])

  return (
    <Modal isCentered isOpen={imageToCrop !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="min(95vw, 500px)">
        <ModalHeader pb={0}>Crop Image</ModalHeader>
        <ModalBody>
          <Text mb={4}>
            Drag the rectangle to adjust the crop area and click the crop and
            save button to save the image.
          </Text>
          <Skeleton
            isLoaded={isInitialImageLoaded}
            w="100%"
            h="300px"
            bgColor="black"
          >
            <Center h="100%">
              <ReactCrop
                aspect={WIKI_IMAGE_ASPECT_RATIO}
                crop={crop}
                onChange={c => setCrop(c)}
              >
                <Image
                  crossOrigin="anonymous"
                  maxH="300px !important"
                  objectFit="contain"
                  ref={previewCropRef}
                  src={initialDisplayImageUrl}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </Center>
          </Skeleton>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={saving}
            disabled={!crop}
            loadingText="Saving..."
            leftIcon={<RiCropLine />}
            colorScheme="brand"
            mr={3}
            onClick={handleImageCrop}
          >
            Crop and Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageCrop
