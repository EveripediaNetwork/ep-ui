import React, { ComponentPropsWithoutRef } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'

export const customTableRenderer = ({
  children,
  ...props
}: React.PropsWithChildren<
  ComponentPropsWithoutRef<'table'> & ReactMarkdownProps
>) => {
  return (
    <div className="table-container">
      <table {...props}>{children}</table>
    </div>
  )
}
