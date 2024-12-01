import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { Trash, Plus } from '@phosphor-icons/react'

import Parse from 'parse/dist/parse.min.js'

import { Header } from '../../components/header'

import { printPrice } from '../../utils/printPrice'
import { useClientStore } from '../../store/useClientStore'

export default function Products() {
  const navigate = useNavigate()

  const { client } = useClientStore((state) => ({
    client: state.client,
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

  if (client?.email !== 'admin@admin.com') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-16">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative flex items-center justify-between w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  CUPCAKES
                </h3>

                <button
                  onClick={() => navigate('/products/add')}
                  className="flex items-center gap-1 bg-orange-400 hover:bg-orange-500 duration-300 text-white p-2 rounded-md"
                >
                  <Plus size={16} className="text-white" />
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Nome
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
                {products.map((product) => {
                  return (
                    <tr key={product.objectId}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {product.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {printPrice.format(product.price)}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={async () => {
                            const Product = new Parse.Object('Product')

                            Product.set('objectId', product.objectId)

                            await Product.destroy()

                            toast.success('CupCake excluído com sucesso')

                            getProducts()
                          }}
                        >
                          <Trash size={24} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {products.length === 0 && (
                  <tr>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      Você ainda não tem produtos cadastrados.
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
