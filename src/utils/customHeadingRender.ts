import { store } from '@/store/store'
import React from 'react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

export const addToTOC = ({
  children,
  ...props
}: React.PropsWithChildren<HeadingProps>) => {
  const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
  if (level && children && typeof children[0] === 'string') {
    // id for each heading to be used in table of contents
    const id = `${children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${
      store.getState().toc.length
    }`

    // add the toc to toc state. only add alternate headings since there seems to
    // be a bug somewhere in react-markdown where it adds the heading twice
    // TODO: Find out why this is happening
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
