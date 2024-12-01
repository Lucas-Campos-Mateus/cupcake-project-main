import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import Parse from 'parse/dist/parse.min.js'

import { Header } from '../../components/header'
import { useClientStore } from '../../store/useClientStore'

export default function AddCouponCode() {
  const navigate = useNavigate()

  const { client } = useClientStore((state) => ({
    client: state.client,
  }))

  const [code, setCode] = useState('')
  const [discountValue, setDiscountValue] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  if (client?.email !== 'admin@admin.com') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-16">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <h3 className="font-semibold text-xl text-blueGray-700">
              Novo Cupom de Desconto
            </h3>
          </div>

          <div className="w-full overflow-x-auto p-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <input
                  className="border border-slate-100 rounded h-9 w-full hover:border-slate-300 duration-300 px-3"
                  type="text"
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Código"
                />

                <input
                  className="border border-slate-100 rounded h-9 w-full hover:border-slate-300 duration-300 px-3"
                  type="number"
                  onChange={(event) =>
                    setDiscountValue(Number(event.target.value))
                  }
                  placeholder="Valor de Desconto"
                />
              </div>
              <button
                className="bg-orange-400 hover:bg-orange-600 duration-300 w-full text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  setIsLoading(true)

                  const CouponCode = new Parse.Object('CouponCode')

                  CouponCode.set('code', code)
                  CouponCode.set('discountValue', discountValue)

                  await CouponCode.save()

                  toast.success('Cupom cadastrado com sucesso')

                  navigate('/coupon-codes')

                  setIsLoading(false)
                }}
              >
                {isLoading ? (
                  <div
                    className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>Cadastrar</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
