import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { RiCloseLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'

import buffer from 'buffer'
import { Image } from '../Image/Image'

type DropzoneType = {
  dropZoneActions: {
    setHideImageInput: (hide: boolean) => void
    setImage: (name: string, f: string | ArrayBuffer | null) => void
    deleteImage: () => void
    initialImage: any
  }
}

const Dropzone = ({ dropZoneActions }: DropzoneType) => {
  const [paths, setPaths] = useState<Array<string>>([])
  const [{ data: accountData }] = useAccount()
  const { setHideImageInput, setImage, deleteImage, initialImage } =
    dropZoneActions

  const onDrop = useCallback(
    acceptedFiles => {
      setPaths(acceptedFiles.map((file: File) => URL.createObjectURL(file)))

      acceptedFiles.forEach((f: File) => {
        const reader = new FileReader()

        reader.onload = () => {
          const binaryStr = new buffer.Buffer(reader.result as Buffer)
          setImage(f.name, binaryStr)
        }

        reader.readAsArrayBuffer(f)
      })
      setHideImageInput(true)
    },
    [setPaths, setHideImageInput, setImage],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg, image/png, image/jpg',
  })

  useEffect(() => {
    if (initialImage) {
      setPaths([initialImage])
      // const reader = new FileReader()
      // reader.onload = e => {
      //   console.log(e)
      //   setPaths([String(e?.target?.result)])
      // }
      // reader.readAsArrayBuffer(initialImage)
    }
  }, [initialImage])

  console.log(paths)

  return (
    <Box>
      {paths.length === 0 ? (
        <Box
          display="flex"
          padding="10px"
          border="1px"
          borderStyle="dashed"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          maxH="345px"
          minH="300px"
          _hover={{
            boxShadow: 'md',
            borderColor: 'orange',
          }}
          {...getRootProps()}
        >
          <input disabled={!accountData?.address} {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop an image, or click to select</p>
          )}
        </Box>
      ) : (
        <Flex direction="column" w="full" h="full" justify="center">
          {paths.map(path => (
            <Image
              mx="auto"
              w="350px"
              h="300px"
              key={path}
              src={path}
              alt="highlight"
            />
          ))}
          <Button
            w="25%"
            fontWeight="bold"
            fontSize="20px"
            m="auto"
            mt="5px"
            shadow="md"
            bg="red.400"
            onClick={() => {
              setPaths([])
              setHideImageInput(false)
              deleteImage()
            }}
          >
            <RiCloseLine />
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default Dropzone
