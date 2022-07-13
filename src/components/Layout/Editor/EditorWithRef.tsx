import React from 'react'
import { Editor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/cite'
import media from '@/editor-plugins/media'
import type { Editor as ToastUIEditor } from '@toast-ui/react-editor'

type WrappedEditorProps = {
  forwardedRef: React.ForwardedRef<ToastUIEditor>
}
const WrappedEditor = (props: WrappedEditorProps) => {
  const { forwardedRef } = props

  return (
    <Editor
      {...props}
      ref={forwardedRef}
      usageStatistics={false}
      plugins={[wikiLink, cite, media]}
    />
  )
}

export default WrappedEditor
