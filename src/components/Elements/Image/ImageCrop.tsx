/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import 'react-image-crop/dist/ReactCrop.css'

async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop,
  scale = 1,
  rotate = 0,
) {
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
  setImageInput: (url: string) => void
}

const ImageCrop = ({
  imgArrayBuffer,
  onClose,
  setImage,
  setImageInput,
}: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>()
  const previewCropRef = useRef(null)

  const handleImageCrop = () => {
    if (!previewCropRef.current || !crop) return

    const canvas = document.createElement('canvas')
    canvasPreview(previewCropRef.current, canvas, crop, 1, 0)

    // get blob from canvas
    canvas.toBlob(b => {
      if (b) {
        // convert blob to array buffer
        const reader = new FileReader()
        reader.readAsArrayBuffer(b)
        reader.onload = () => {
          if (reader.result) {
            setImageInput(URL.createObjectURL(b))
            setImage('image', reader.result as ArrayBuffer)
            onClose()
          }
        }
      }
    }, 'image/jpeg')
  }

  return (
    <Modal isOpen={imgArrayBuffer !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop Image</ModalHeader>
        <ModalBody>
          <ReactCrop crop={crop} onChange={c => setCrop(c)}>
            <img
              ref={previewCropRef}
              src={URL.createObjectURL(new Blob([imgArrayBuffer]))}
              alt="crop"
            />
          </ReactCrop>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              handleImageCrop()
              //   onClose()
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageCrop
