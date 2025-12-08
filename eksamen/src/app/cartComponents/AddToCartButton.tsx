'use client'

import { useCart } from './CartContext'

export default function AddToCartButton({
  id,
  title,
}: {
  id: string | number
  title: string
}) {
  const { addToCart } = useCart()

  return (
    <button
      className="cart-button"
      onClick={() => addToCart({ id, title, quantity: 1 })}
    >
      Legg i handlekurv
    </button>
  )
}
