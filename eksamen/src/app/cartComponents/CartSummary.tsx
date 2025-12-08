"use client"

import Link from "next/link"
import { useCart } from "./CartContext"

export default function CartSummary() {
  const { items } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="cart-summary">
      <Link href="/cart" className="cart-summary-link">
        🛒 Handlekurv{totalItems > 0 && ` (${totalItems})`}
      </Link>
    </div>
  )
}