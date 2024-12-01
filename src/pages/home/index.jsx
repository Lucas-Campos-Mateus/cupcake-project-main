import { useEffect, useState } from 'react'
import { Heart } from '@phosphor-icons/react'

import { toast } from 'react-toastify'

import Parse from 'parse/dist/parse.min.js'

import { useCartStore } from '../../store/useCartStore'
import { useClientStore } from '../../store/useClientStore'

import { Header } from '../../components/header'

import { printPrice } from '../../utils/printPrice'

function Home() {
  const { client, setClient } = useClientStore((state) => ({
    client: state.client,
    setClient: state.setClient,
  }))

  const { addProductToCart } = useCartStore((state) => ({
    cart: state.cart,
    addProductToCart: state.addProductToCart,
    removeProductFromCart: state.removeProductFromCart,
    incrementProductQuantity: state.incrementProductQuantity,
    decrementProductQuantity: state.decrementProductQuantity,
    clearCart: state.clearCart,
  }))

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const parseQuery = new Parse.Query('Product')

    const findProducts = await parseQuery.find()

    const productsList = findProducts.map((product) => {
      return product.toJSON()
    })

    setProducts(productsList)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="p-10">
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => {
            return (
              <div key={product.objectId}>
                <img
                  alt={product.name}
                  className="w-full h-64 object-cover rounded"
                  src={product.img_url}
                />
                <div className="flex flex-col gap-3 p-3">
                  <span className="text-lg font-bold">{product.name}</span>
                  <span className="text-lg font-bold">
                    {printPrice.format(product.price)}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      className="bg-orange-400 hover:bg-orange-600 duration-300 w-full text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        addProductToCart(product)

                        toast('CupCake adicionado ao carrinho')
                      }}
                    >
                      Adicionar ao carrinho
                    </button>
                    {client.favorite_products.find(
                      (favoriteProduct) =>
                        favoriteProduct.objectId === product.objectId,
                    ) ? (
                      <Heart
                        className="cursor-pointer"
                        size={36}
                        weight="fill"
                        onClick={async () => {
                          const Client = new Parse.Object('Client')
                          Client.set('objectId', client.objectId)

                          const favoriteProducts =
                            client.favorite_products || []

                          const filteredFavoriteProducts =
                            favoriteProducts.filter(
                              (favoriteProduct) =>
                                favoriteProduct.objectId !== product.objectId,
                            )

                          Client.set(
                            'favorite_products',
                            filteredFavoriteProducts,
                          )

                          await Client.save()

                          setClient({
                            ...client,
                            favorite_products: filteredFavoriteProducts,
                          })

                          toast('CupCake removido dos favoritos')
                        }}
                      />
                    ) : (
                      <Heart
                        className="cursor-pointer"
                        size={36}
                        onClick={async () => {
                          const Client = new Parse.Object('Client')
                          Client.set('objectId', client.objectId)

                          const favoriteProducts =
                            client.favorite_products || []

                          favoriteProducts.push(product)

                          Client.set('favorite_products', favoriteProducts)

                          await Client.save()

                          setClient({
                            ...client,
                            favorite_products: favoriteProducts,
                          })

                          toast('CupCake adicionado aos favoritos')
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
