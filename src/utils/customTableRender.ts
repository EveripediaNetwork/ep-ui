import React, { ComponentPropsWithoutRef } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'

export const customTableRenderer = ({
  children,
  ...props
}: React.PropsWithChildren<
  ComponentPropsWithoutRef<'table'> & ReactMarkdownProps
>) => {
  const table = React.createElement(props.node.tagName, props, children)
  return React.createElement('div', { className: 'table-container' }, table)
}
