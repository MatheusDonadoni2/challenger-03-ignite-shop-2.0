import type { AppProps } from 'next/app'
import Image from 'next/image'

import { Cart } from '@/components/cart'
import { CartProvider } from '@/context/cart-context'
import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'

import logoImg from '../assets/logo.svg'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <Cart />
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
