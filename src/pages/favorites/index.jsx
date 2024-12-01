import { Trash } from '@phosphor-icons/react'

import { toast } from 'react-toastify'

import Parse from 'parse/dist/parse.min.js'

import { Header } from '../../components/header'

import { useClientStore } from '../../store/useClientStore'

import { printPrice } from '../../utils/printPrice'

export default function Favorites() {
  const { client, setClient } = useClientStore((state) => ({
    client: state.client,
    setClient: state.setClient,
  }))

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-16">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  CUPCAKES FAVORITOS
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    CupCake
                  </th>
                  <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Preço
                  </th>
                  <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Excluir
                  </th>
                </tr>
              </thead>

              <tbody>
                {client?.favorite_products.map((favorite) => {
                  return (
                    <tr key={favorite.objectId}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {favorite.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {printPrice.format(favorite.price)}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={async () => {
                            const Client = new Parse.Object('Client')
                            Client.set('objectId', client.objectId)

                            const favoriteProducts =
                              client.favorite_products || []

                            const filteredFavoriteProducts =
                              favoriteProducts.filter(
                                (favoriteProduct) =>
                                  favoriteProduct.objectId !==
                                  favorite.objectId,
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

                            toast.success('CupCake removido dos favoritos.')
                          }}
                        >
                          <Trash size={24} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {client?.favorite_products.length === 0 && (
                  <tr>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      Você ainda não tem favoritos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
