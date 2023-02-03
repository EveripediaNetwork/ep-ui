import config from '@/config'
import { IMAGE_BOX_SIZE } from '@/data/Constants'
import { saveImage } from '@/utils/CreateWikiUtils/createWiki'
import { Box, Spinner, useToast } from '@chakra-ui/react'
import React, { memo, useRef } from 'react'
import { Image, NextChakraImageProps } from '../Elements/Image/Image'

interface ImageUploadProps extends NextChakraImageProps {
  defaultImage: string
  setImgIPFSHash: (id: string) => void
  imgIPFSHash: string | null
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const ImageUpload = ({
  defaultImage,
  setImgIPFSHash,
  imgIPFSHash,
  isLoading,
  setIsLoading,
  ...rest
}: Omit<ImageUploadProps, 'src'>) => {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const toast = useToast()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (file) {
      setIsLoading(true)
      const IPFSHash = await saveImage({
        id: 'profile',
        type: file,
      })
      if (!IPFSHash) {
        toast({
          title: 'Error uploading image',
          status: 'error',
        })
      } else setImgIPFSHash(IPFSHash)
      setIsLoading(false)
    }
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
        disabled={isLoading}
      />
      <Box pos="relative" w="max-content">
        {isLoading && (
          <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={9}
            bgColor="pageBg"
            p={2}
            borderRadius="50%"
          >
            <Spinner
              size="xl"
              thickness="6px"
              color="brandLinkColor"
              display="block"
            />
          </Box>
        )}
        <Image
          {...rest}
          cursor="pointer"
          overflow="hidden"
          bgColor="rgba(130, 130, 130, 0.49)"
          position="relative"
          imgBoxSize={IMAGE_BOX_SIZE}
          _hover={
            isLoading
              ? { cursor: 'not-allowed' }
              : {
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
                    content: 'url(/images/icons/edit-icon.svg)',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 999,
                  },
                }
          }
          src={
            imgIPFSHash ? `${config.pinataBaseUrl}${imgIPFSHash}` : defaultImage
          }
          onClick={() => imageRef.current?.click()}
        />
      </Box>
    </>
  )
}

export default memo(ImageUpload)
