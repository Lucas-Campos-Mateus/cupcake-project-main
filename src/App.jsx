import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import { useCartStore } from './store/useCartStore'
import { useClientStore } from './store/useClientStore'

import { publicRoutes } from './routes/public-routes'
import { privateRoutes } from './routes/private-routes'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { setCart } = useCartStore((state) => ({
    setCart: state.setCart,
  }))

  const { client, setClient } = useClientStore((state) => ({
    client: state.client,
    setClient: state.setClient,
  }))

  useEffect(() => {
    const client = localStorage.getItem('client')

    if (client) {
      setClient(JSON.parse(client))
    }
  }, [setClient])

  useEffect(() => {
    const cart = localStorage.getItem('cart')

    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [setCart])

  const router = createBrowserRouter(client ? privateRoutes : publicRoutes)

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
