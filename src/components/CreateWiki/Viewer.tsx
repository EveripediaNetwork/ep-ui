import { Viewer as ToastUIViewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Box, useColorMode } from '@chakra-ui/react'
import { Wiki } from '@everipedia/iq-utils'
import { Dict } from '@chakra-ui/utils'
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/wikiLink'
import media from '@/editor-plugins/wikiLink'
import embed from '@/editor-plugins/wikiLink'
import { useEffect, useRef } from 'react'

interface WikiMainContentProps {
  wiki: Wiki
}

const ToastUIViewerJSX = ToastUIViewer as unknown as (
  props: Dict,
) => JSX.Element

const MarkdownViewer = ({ wiki }: WikiMainContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const editorContainer = containerRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]
    if (editorContainer) {
      if (colorMode === 'dark')
        editorContainer.classList.add('toastui-editor-dark')
      else editorContainer.classList.remove('toastui-editor-dark')
    }
  }, [colorMode])

  return (
    <Box ref={containerRef} m={0} w="full" h="full">
      <ToastUIViewerJSX
        initialValue={wiki.content}
        plugins={[wikiLink, cite, media, embed, tableMergedCellPlugin]}
        height="100%"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
      />
    </Box>
  )
}

export default MarkdownViewer
