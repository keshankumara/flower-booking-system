import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  loadCart,
  saveCart,
  clearCart as clearCartStorage,
  addItem    as cartAdd,
  removeItem as cartRemove,
  updateQuantity as cartUpdate,
  totalCount as calcCount,
  totalPrice as calcTotal,
} from '../services/cartService'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Seed from localStorage on first render
  const [items, setItems] = useState(() => loadCart())

  // Persist every change
  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback((flower, quantity = 1) => {
    setItems((prev) => cartAdd(prev, flower, quantity))
  }, [])

  const removeItem = useCallback((flowerId) => {
    setItems((prev) => cartRemove(prev, flowerId))
  }, [])

  const updateQuantity = useCallback((flowerId, quantity) => {
    setItems((prev) => cartUpdate(prev, flowerId, quantity))
  }, [])

  const clearCart = useCallback(() => {
    clearCartStorage()
    setItems([])
  }, [])

  const value = {
    items,
    totalCount: calcCount(items),
    totalPrice: calcTotal(items),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
