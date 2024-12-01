import { create } from 'zustand'

export const useCartStore = create((set) => ({
  cart: [],
  addProductToCart: (product) =>
    set((state) => {
      const findProduct = state.cart.find(
        (p) => p.objectId === product.objectId,
      )

      if (findProduct) {
        const newCart = state.cart.map((p) => {
          if (p.objectId === product.objectId) {
            return { ...p, quantity: p.quantity + 1 }
          }
          return p
        })

        localStorage.setItem('cart', JSON.stringify(newCart))

        return { cart: newCart }
      }

      const newCart = [...state.cart, { ...product, quantity: 1 }]

      localStorage.setItem('cart', JSON.stringify(newCart))

      return { cart: newCart }
    }),
  incrementProductQuantity: (product) =>
    set((state) => {
      const newCart = state.cart.map((p) => {
        if (p.objectId === product.objectId) {
          return { ...p, quantity: p.quantity + 1 }
        }
        return p
      })

      localStorage.setItem('cart', JSON.stringify(newCart))

      return { cart: newCart }
    }),
  decrementProductQuantity: (product) =>
    set((state) => {
      const newCart = state.cart.map((p) => {
        if (p.objectId === product.objectId && p.quantity > 1) {
          return { ...p, quantity: p.quantity - 1 }
        }

        return p
      })

      localStorage.setItem('cart', JSON.stringify(newCart))

      return { cart: newCart }
    }),
  removeProductFromCart: (product) =>
    set((state) => {
      const newCart = state.cart.filter((p) => p.objectId !== product.objectId)

      localStorage.setItem('cart', JSON.stringify(newCart))

      return { cart: newCart }
    }),
  setCart: (cart) => set({ cart }),
  clearCart: () => {
    localStorage.removeItem('cart')
    return set({ cart: [] })
  },
}))
