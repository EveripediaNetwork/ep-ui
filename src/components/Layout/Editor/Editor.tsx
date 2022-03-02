import React, { memo, useEffect, useRef, useState } from 'react'
import { Box, Select, useColorMode } from '@chakra-ui/react'

/* eslint-disable-next-line import/no-extraneous-dependencies */
import '@toast-ui/editor/dist/i18n/es-es'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/i18n/ko-kr'
import '@toast-ui/editor/dist/toastui-editor.css'
/* eslint-disable-next-line import/no-extraneous-dependencies */

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'

type EditorType = {
  onChange: (value: string) => void
  initialValue: string
}

const Editor = ({ onChange, initialValue }: EditorType) => {
  const { colorMode } = useColorMode()
  const [language, setLanguage] = useState('en-US')
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef && editorRef.current !== null) {
      ;(editorRef.current as any).getInstance().i18n.setCode(language)
    }
  }, [language])

  return (
    <Box m={0} w="100%" h="100%">
      <Select
        maxW="30%"
        mb="3"
        onChange={event => setLanguage(event.target.value)}
      >
        <option value="en-US">English</option>
        <option value="es-ES">Español</option>
        <option value="ko-KR">Korean</option>
        <option value="zh-CN">Chinese</option>
      </Select>
      <ToastUIEditor
        height="100%"
        language={language}
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        initialValue={initialValue}
        ref={editorRef}
        onChange={() =>
          onChange((editorRef.current as any).getInstance().getMarkdown())
        }
      />
    </Box>
  )
}

export default memo(Editor)
