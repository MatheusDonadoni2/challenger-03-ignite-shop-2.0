import { Bag, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/image'
import { useContext, useState } from 'react'

import { CartContext } from '@/context/cart-context'

import {
  CartCardProduct,
  CartContent,
  CartFooter,
  CartImageContainer,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Header,
} from '../styles/components/cart'

export function Cart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartProducts, cartDetails, removeCartProduct } =
    useContext(CartContext)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        cartProducts,
      })
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <Dialog.Root>
      <DialogTrigger disabled={!cartDetails.quantityItems}>
        {cartDetails.quantityItems > 0 && (
          <span>{cartDetails.quantityItems}</span>
        )}
        <Bag size={24} color="#8D8D99" />
      </DialogTrigger>
      <Dialog.Portal>
        <DialogContent>
          <Header>
            <DialogClose>
              <X size={24} color="#C4C4CC" weight={'bold'} />
            </DialogClose>
          </Header>

          <h1>Sacola de compras</h1>

          <CartContent>
            {cartProducts.map((product) => {
              return (
                <CartCardProduct key={product.id}>
                  <CartImageContainer>
                    <Image
                      src={product.imageUrl}
                      width={101.94}
                      height={93}
                      alt=""
                    />
                  </CartImageContainer>
                  <main>
                    <span>{product.name}</span>
                    <strong>{product.price}</strong>
                    <a onClick={() => removeCartProduct(product)}>Remover</a>
                  </main>
                </CartCardProduct>
              )
            })}
          </CartContent>

          <CartFooter>
            <section className="amount">
              <strong>Quantidade</strong>
              <span>{cartDetails.quantityItems} itens</span>
            </section>
            <section className="total">
              <strong>Valor total</strong>
              <span>{cartDetails.totalValue}</span>
            </section>

            <button
              onClick={handleBuyProduct}
              disabled={isCreatingCheckoutSession}
            >
              Finalizar compra
            </button>
          </CartFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
