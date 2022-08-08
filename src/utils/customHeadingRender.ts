import { store } from '@/store/store'
import React from 'react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

export const addToTOC = ({
  children,
  ...props
}: React.PropsWithChildren<HeadingProps>) => {
  const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
  if (level && children && typeof children[0] === 'string') {
    const id = `${children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${
      store.getState().toc.length
    }`
    store.dispatch({
      type: 'toc/addToc',
      payload: {
        level,
        id,
        title: children[0],
      },
    })
    return React.createElement(props.node.tagName, { id }, children)
  }
  return React.createElement(props.node.tagName, props, children)
}
