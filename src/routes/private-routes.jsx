import { Navigate } from 'react-router-dom'

import HomePage from '../pages/home'
import CartPage from '../pages/cart'
import FavoritesPage from '../pages/favorites'
import OrdersPage from '../pages/orders'
import OrderPage from '../pages/order'
import ProductsPage from '../pages/products'
import AddProductPage from '../pages/add-product'
import ClientsPage from '../pages/clients'
import AddClientPage from '../pages/add-client'
import CouponCodesPage from '../pages/coupon-codes'
import AddCouponCodesPage from '../pages/add-coupon-code'

export const privateRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/orders', element: <OrdersPage /> },
  { path: '/orders/:orderId', element: <OrderPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/add', element: <AddProductPage /> },
  { path: '/clients', element: <ClientsPage /> },
  { path: '/clients/add', element: <AddClientPage /> },
  { path: '/clients/add', element: <AddClientPage /> },
  { path: '/coupon-codes', element: <CouponCodesPage /> },
  { path: '/coupon-codes/add', element: <AddCouponCodesPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]
