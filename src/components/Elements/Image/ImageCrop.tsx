/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react'
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
  Text,
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

const canvasPreview = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop,
  scale = 1,
  rotate = 0,
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

  const rotateRads = rotate * (Math.PI / 180)
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.rotate(rotateRads)
  ctx.scale(scale, scale)
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
  imgArrayBuffer: ArrayBuffer
  onClose: () => void
  setImage: (name: string, f: ArrayBuffer) => void
  setDisplayImage: (url: string) => void
}

const ImageCrop = ({
  imgArrayBuffer,
  onClose,
  setImage,
  setDisplayImage,
}: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>()
  const previewCropRef = useRef(null)

  console.log(crop)

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (crop) return
    const { width, height } = e.currentTarget
    console.log('onImageLoad', width, height)
    setCrop(centerAspectCrop(width, height, WIKI_IMAGE_ASPECT_RATIO))
  }

  const handleImageCrop = () => {
    if (!previewCropRef.current || !crop) return

    const canvas = document.createElement('canvas')
    canvasPreview(previewCropRef.current, canvas, crop, 1, 0)

    canvas.toBlob(b => {
      if (b) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(b)
        reader.onload = () => {
          if (reader.result) {
            setDisplayImage(URL.createObjectURL(b))
            setImage('image', reader.result as ArrayBuffer)
            onClose()
          }
        }
      }
    }, 'image/jpeg')
  }

  return (
    <Modal isCentered isOpen={imgArrayBuffer !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb={0}>Crop Image</ModalHeader>
        <ModalBody>
          <Text mb={4}>
            Drag the rectangle to adjust the crop area and click the crop and
            save button to save the image.
          </Text>
          <Center>
            <ReactCrop
              aspect={WIKI_IMAGE_ASPECT_RATIO}
              crop={crop}
              onChange={c => setCrop(c)}
            >
              <Image
                maxH="50vh !important"
                objectFit="cover"
                ref={previewCropRef}
                src={URL.createObjectURL(new Blob([imgArrayBuffer]))}
                alt="crop"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
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
