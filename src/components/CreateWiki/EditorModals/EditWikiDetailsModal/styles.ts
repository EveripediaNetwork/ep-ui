import { CSSObject } from '@chakra-ui/react'

export const tagsInputStyle: CSSObject = {
  '[data-part=control]': {
    padding: '0 2px',
    background: '#fff',
    border: '1px solid #ccc',
    width: '40em',
    borderRadius: '2px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
    '&[data-disabled]': {
      background: '#f9f9f9',
    },
    '&[data-focus], &:focus': {
      borderColor: 'red',
      outline: 0,
    },
  },
  '[data-part=tag]': {
    bg: 'gray.300',
    _dark: {
      bg: 'whiteAlpha.300',
      color: 'white',
    },
    color: '#444',
    padding: '0 4px',
    margin: '2px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    borderColor: 'transparent',
    fontSize: 'xs',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    '[data-part=delete-button]': { ml: '2' },
    '&[hidden]': {
      display: 'none !important',
    },
    '&[data-selected]': {
      backgroundColor: '#777',
      borderColor: '#777',
      color: '#eee',
    },
    '&[data-disabled]': {
      opacity: 0.6,
      cursor: 'default',
    },
  },
  '[data-part*=input]': {
    appearance: 'none',
    padding: '3px',
    margin: '0',
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    font: 'inherit',
    fontSize: '100%',
    outline: 'none',
    display: 'inline-block !important',
    '&[hidden]': {
      display: 'none !important',
    },
    '&:disabled': {
      opacity: 0.6,
    },
  },
  '[data-part=delete-button]': {
    all: 'unset',
  },
}
