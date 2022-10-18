import React from 'react'
import { chakra, forwardRef, LinkOverlayProps } from '@chakra-ui/react'

const cx = (...classNames: any[]) => classNames.filter(Boolean).join(' ')

export const PatchedLinkOverlay = forwardRef<LinkOverlayProps, 'a'>(
  function LinkOverlay(props, ref) {
    const { isExternal, target, rel, className, ...rest } = props
    return (
      <chakra.a
        ref={ref}
        className={cx('chakra-linkbox__overlay', className)}
        rel={isExternal ? 'noopener noreferrer nofollow' : rel}
        target={isExternal ? '_blank' : target}
        __css={{
          position: 'static',
          '&::before': {
            content: "''",
            cursor: 'inherit',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
          },
        }}
        {...rest}
      />
    )
  },
)
