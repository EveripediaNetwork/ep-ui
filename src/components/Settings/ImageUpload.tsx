import React, { useRef, useEffect, useState } from 'react'
import { Image, NextChakraImageProps } from '../Elements/Image/Image'

interface ImageUploadProps extends NextChakraImageProps {
  defaultImage: string
}

const ImageUpload = ({
  defaultImage,
  ...rest
}: Omit<ImageUploadProps, 'src'>) => {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [defaultUserImage, setDefaultUserImage] = useState(defaultImage)

  // On each file selection update the default image
  const [selectedFile, setSelectedFile] = useState()

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile)
      setDefaultUserImage(objectURL)
      // Clean up the selection to avoid memory leak
      return () => URL.revokeObjectURL(objectURL)
    }
    return () => {}
  }, [selectedFile])

  // On each change let user have access to a selected file
  const handleChange = (event: any) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  return (
    <>
      <input
        type="file"
        id="file"
        accept="image/png, image/jpeg"
        ref={imageRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Image
        {...rest}
        cursor="pointer"
        overflow="hidden"
        bgColor="rgba(130, 130, 130, 0.49)"
        position="relative"
        _hover={{
          _after: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            bg: 'rgba(0, 0, 0, 0.5)',
          },
          _before: {
            content: 'url(/images/edit_icon.svg)',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999,
          },
        }}
        src={defaultUserImage}
        onClick={() => imageRef.current?.click()}
      />
    </>
  )
}

export default ImageUpload
