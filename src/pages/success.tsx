import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImageMain,
  SuccessContainer,
} from '@/styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    images: string[]
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  console.log(products)

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImageMain>
          {products.map(() => (
            <ImageContainer key={products[0].images[0]}>
              <Image
                src={products[0].images[0]}
                width={140}
                height={140}
                alt=""
              />
            </ImageContainer>
          ))}
        </ImageMain>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>compra de {products.length} camisetas</strong> já está a
          caminho da sua casa.
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(
    (product) => product.price.product,
  ) as Stripe.Product[]

  return {
    props: {
      customerName,
      products,
    },
  }
}
