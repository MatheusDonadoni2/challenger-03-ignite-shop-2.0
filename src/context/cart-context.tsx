import { createContext, ReactNode, useEffect, useState } from 'react'

interface ProductProps {
  id: string
  name: string
  description: string
  imageUrl: string
  defaultPriceId: string
  price: string
  priceInCents: number
}

interface CartProviderProps {
  children: ReactNode
}

interface CartDetailsProps {
  quantityItems: number
  totalValue: string
}

interface CartContextProps {
  cartProducts: ProductProps[]
  cartDetails: CartDetailsProps
  setCartProduct: (product: ProductProps) => void
  removeCartProduct: (product: ProductProps) => void
}

const cartContextDefaultValue: CartContextProps = {
  cartProducts: [],
  setCartProduct: () => {},
  removeCartProduct: () => {},
  cartDetails: {
    quantityItems: 0,
    totalValue: 'R$ 0,00',
  },
}

export const CartContext = createContext<CartContextProps>(
  cartContextDefaultValue,
)

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<ProductProps[]>([])
  const [cartDetails, setCartDetails] = useState<CartDetailsProps>({
    quantityItems: 0,
    totalValue: 'R$ 0,00',
  })

  function setCartProduct(product: ProductProps) {
    const productAlreadyExits = cartProducts.find(({ id }) => id === product.id)

    if (productAlreadyExits) {
      return
    }

    setCartProducts((state) => [...state, product])
  }

  function removeCartProduct(product: ProductProps) {
    setCartProducts(cartProducts.filter(({ id }) => id !== product.id))
  }

  function updateCartDetail() {
    const totalValue = cartProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.priceInCents,
      0,
    )

    setCartDetails({
      quantityItems: cartProducts.length,
      totalValue: Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(totalValue / 100),
    })
  }

  useEffect(() => updateCartDetail(), [cartProducts])

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProduct, removeCartProduct, cartDetails }}
    >
      {children}
    </CartContext.Provider>
  )
}
