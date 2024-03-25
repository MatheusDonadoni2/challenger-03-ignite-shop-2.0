import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Stripe from 'stripe'

import { CartContext } from '@/context/cart-context'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    defaultPriceId: string
    price: string
    priceInCents: number
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PnA1lNinxHKSIN' } }],
    fallback: true,
  }
}

export default function Product({ product }: ProductProps) {
  const { setCartProduct } = useContext(CartContext)
  const { isFallback } = useRouter()

  if (isFallback) {
    return
  }

  async function handleBuyProduct() {
    setCartProduct(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button onClick={handleBuyProduct}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        defaultPriceId: price.id,
        priceInCents: price.unit_amount,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
