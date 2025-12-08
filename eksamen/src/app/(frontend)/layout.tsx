"use client"

import React from "react"
import { CartProvider } from "../cartComponents/CartContext"
import Link from 'next/link'
import "./styles.css"

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
        <header className="site-header">
                    <Link href="/" className="logo">
                      BookDragons
                    </Link>
                  </header>
      {children}
    </CartProvider>
  )
}