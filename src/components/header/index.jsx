import { Link } from 'react-router-dom'

import { ShoppingCart, SignOut } from '@phosphor-icons/react'

import { useCartStore } from '../../store/useCartStore'
import { useClientStore } from '../../store/useClientStore'

import cupcakeImage from '../../assets/images.png'

export function Header() {
  const { client, setClient } = useClientStore((state) => ({
    client: state.client,
    setClient: state.setClient,
  }))

  const { cart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    clearCart: state.clearCart,
  }))

  return (
    <div className="w-full h-14 bg-orange-600 text-white flex items-center justify-between px-6">
      <Link to="/">
        <img className='w-10 h-10' src={cupcakeImage} alt="Logo"/>
      </Link>
      <div className="flex gap-3">
        {client.email === 'admin@admin.com' && (
          <>
            <Link
              to="/products"
              className="hover:underline duration-300 transition-all"
            >
              Produtos
            </Link>
            <Link
              to="/clients"
              className="hover:underline duration-300 transition-all"
            >
              Clientes
            </Link>
            <Link
              to="/coupon-codes"
              className="hover:underline duration-300 transition-all"
            >
              Cupom de Descontos
            </Link>
          </>
        )}
        <Link
          to="/orders"
          className="hover:underline duration-300 transition-all"
        >
          Meus Pedidos
        </Link>
        <Link
          to="/favorites"
          className="hover:underline duration-300 transition-all"
        >
          Favoritos
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Link to="/cart">
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center text-xs text-orange-500">
              {cart.length}
            </span>
            <ShoppingCart size={36} className="cursor-pointer" />
          </div>
        </Link>
        <SignOut
          size={24}
          className="cursor-pointer"
          onClick={() => {
            setClient(null)
            clearCart()
          }}
        />
      </div>
    </div>
  )
}
