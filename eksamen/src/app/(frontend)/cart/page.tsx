'use client'

import React, { FormEvent, useState } from 'react'
import { useCart } from '../../cartComponents/CartContext'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3000'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (items.length === 0) {
      setMessage('Handlekurven er tom.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${CMS_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          items: items.map(item => ({
            book: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (!res.ok) {
        console.error('Bestilling feilet:', await res.text())
        setMessage('Noe gikk galt. Prøv igjen.')
        return
      }

      clearCart()
      setName('')
      setEmail('')
      setPhone('')

      setMessage(
        'Takk! Bestillingen er sendt. Bøkene er reservert og kan hentes i butikken.',
      )
    } catch (err) {
      console.error(err)
      setMessage('Noe gikk galt. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="cart-page">
      <h1>Handlekurv</h1>

      {items.length === 0 ? (
        <p>Handlekurven er tom.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map(item => (
              <li className="cart-item" key={item.id}>
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-qty">x {item.quantity}</span>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Fjern
                </button>
              </li>
            ))}
          </ul>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Kontaktinformasjon</h2>

            <label className="form-field">
              Navn
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>

            <label className="form-field">
              E-post
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="form-field">
              Telefon (valgfritt)
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="cart-checkout-button"
              disabled={loading}
            >
              {loading ? 'Sender bestilling…' : 'Send bestilling'}
            </button>

            {message && <p className="form-message">{message}</p>}
          </form>
        </>
      )}
    </main>
  )
}