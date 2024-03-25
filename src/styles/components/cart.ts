import * as Dialog from '@radix-ui/react-dialog'

import { styled } from '@/styles'

export const CartButton = styled('div', {})

export const DialogTrigger = styled(Dialog.Trigger, {
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray800',
  borderRadius: 6,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 0,
  position: 'relative',

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
    width: 30,
    height: 30,
    background: '$green500',
    border: '3px solid $gray900',
    borderRadius: 9999,
    color: '$white',
    fontSize: '$xs',
    fontWeight: 'bold',
  },
})

export const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',
  position: 'fixed',
  width: '30rem',
  top: 0,
  right: 0,
  bottom: 0,
  boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.8)',
  padding: '1.5rem',

  h1: {
    color: '$gray100',
    fontSize: '$md',
    lineHeight: 1.6,
  },
})

export const Header = styled('title', {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
})

export const DialogClose = styled(Dialog.DialogClose, {
  width: 24,
  height: 24,
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
})

export const CartContent = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  marginTop: '2rem',
  gap: '1rem',
})

export const CartImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101.94,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    objectFit: 'cover',
  },
})

export const CartCardProduct = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '5.875rem',

  gap: '1.25rem',
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    span: {
      color: '$gray300',
      fontSize: '$md',
    },
    strong: { color: '$gray100', fontSize: '$md' },
    a: {
      color: '$green500',
      fontSize: '$md',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const CartFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  section: {},
  color: '$gray100',

  '.amount': {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    lineHeight: 1.6,
    color: '$gray100',
    fontSize: '1rem',
    alignItems: 'center',
    span: {
      color: '$gray300',
    },
  },

  '.total': {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    lineHeight: 1.4,
    color: '$gray100',
    alignItems: 'center',
    span: {
      fontSize: '$md',
    },
    strong: {
      fontSize: '$xl',
    },
  },

  button: {
    marginTop: '3.5625rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
