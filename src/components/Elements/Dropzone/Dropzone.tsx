import React, { useCallback, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { RiCloseLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'

import buffer from 'buffer'
import Button from '../Button/Button'

type DropzoneType = {
  setHideImageInput: (hide: boolean) => void
  setImage: (f: string | ArrayBuffer | null) => void
  deleteImage: () => void
}

const Dropzone = ({
  setHideImageInput,
  setImage,
  deleteImage,
}: DropzoneType) => {
  const [paths, setPaths] = useState([])
  const [{ data: accountData }] = useAccount()

  const onDrop = useCallback(
    acceptedFiles => {
      setPaths(acceptedFiles.map((file: File) => URL.createObjectURL(file)))

      acceptedFiles.forEach((f: File) => {
        const reader = new FileReader()

        reader.onload = () => {
          const binaryStr = new buffer.Buffer(reader.result as Buffer)
          setImage(binaryStr)
        }

        reader.readAsArrayBuffer(f)
      })
      setHideImageInput(true)
    },
    [setPaths],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
  })

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
        <Flex direction="column" w="full" h="full">
          {paths.map(path => (
            <img key={path} src={path} alt="highlight" />
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
