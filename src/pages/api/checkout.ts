import { NextApiRequest, NextApiResponse } from 'next'

import { stripe } from '@/lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { cartProducts } = req.body

  if (!cartProducts) {
    return res.status(404).json({ error: 'Price not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const lineItems = cartProducts.map((item) => {
    return {
      price: item.defaultPriceId,
      quantity: 1,
    }
  })

  const checkoutSessions = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSessions.url,
  })
}
