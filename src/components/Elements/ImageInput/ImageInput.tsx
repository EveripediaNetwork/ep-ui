import React, { ChangeEvent, useState } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'
import axios from 'axios'
import Image from 'next/image'
import buffer from 'buffer'



type ImageInputType = {
  setHideDropzone: (hide: boolean) => void
  setImage: (f: string | ArrayBuffer | null) => void
  deleteImage: () => void
}

const ImageInput = ({
  setHideDropzone,
  setImage,
  deleteImage,
}: ImageInputType) => {
  const [imgSrc, setImageSrc] = useState<string>()

  const handleOnImageInputChanges = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setImageSrc(event.target.value)
    setHideDropzone(true)

    const { data } = await axios.get(String(event.target.value), {
      responseType: 'arraybuffer',
    })
    setImage(new buffer.Buffer(data as Buffer))
  }

  return (
    <Flex
      w="full"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {imgSrc ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Image src={imgSrc} alt="input"/>
          <Button
            w="25%"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setImageSrc(undefined)
              setHideDropzone(false)
              deleteImage()
            }}
          >
            <RiCloseLine />
          </Button>
        </Flex>
      ) : (
        <Input
          onChange={handleOnImageInputChanges}
          placeholder="Paste a link here"
        />
      )}
    </Flex>
  )
}

export default ImageInput
