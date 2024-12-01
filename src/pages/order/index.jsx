import { useParams } from 'react-router-dom'

import { Header } from '../../components/header'

import { useClientStore } from '../../store/useClientStore'
import { useMemo } from 'react'
import { printPrice } from '../../utils/printPrice'

export default function Order() {
  const { orderId } = useParams()

  const { client } = useClientStore((state) => ({
    client: state.client,
  }))

  const order = useMemo(() => {
    return JSON.parse(client?.orders).find((order) => order.id === orderId)
  }, [client?.orders, orderId])

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="flex w-full p-10 gap-10">
        <div className="w-2/3 flex flex-col gap-3">
          <h3 className="text-xl font-semibold">{order?.name}</h3>
          <div className="border border-bg-slate-100 rounded bg-white">
            <table className="w-full text-left text-sm font-semibold">
              <thead className="border-b-[1px] border-b-bg-slate-100">
                <tr>
                  <th className="py-3 px-5">Produto</th>
                  <th className="py-3 px-5">Quantidade</th>
                  <th className="py-3 px-5">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr
                    key={product.objectId}
                    className="border-b-[1px] border-b-bg-slate-100"
                  >
                    <td className="py-3 px-5 flex gap-3 items-center text-sm font-semibold">
                      <img
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        src={product.img_url}
                      />
                      {product.name}
                    </td>
                    <td className="py-3 px-5">
                      <div className="h-10 w-24 px-1 border border-bg-slate-100 flex items-center justify-around">
                        <span>{product.quantity}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      {printPrice.format(product.price * product.quantity)}
                    </td>
                    <td className="py-3 px-5">
                      {printPrice.format(product.price * product.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex py-10 px-20 gap-20">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-xl m-0">Código do Cupom</h3>
                  <span className="text-xs">
                    {order.couponCode || 'Nenhum cupom aplicado'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-52 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-bold">
                      {printPrice.format(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Frete</span>
                    <span className="font-bold">{printPrice.format(10)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Desconto</span>
                    <span className="font-bold">
                      {printPrice.format(order.discount)}
                    </span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-slate-100" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    {printPrice.format(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-3">
          <h3 className="text-xl font-semibold">PAGAMENTO</h3>
          <div className="border border-bg-slate-100 rounded py-3 px-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3 ">
              <h3 className="text-lg font-semibold">Método de Pagamento</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    disabled
                    name="paymentMethod"
                    checked={order.paymentMethod === 'creditCard'}
                    value="creditCard"
                    id="credit-card"
                  />
                  <label className="text-xl" htmlFor="credit-card">
                    Cartão de Crédito
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={order.paymentMethod === 'bankSlip'}
                    value="bankSlip"
                    id="bank-slip"
                  />
                  <label className="text-xl" htmlFor="bank-slip">
                    Boleto Bancário
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={order.paymentMethod === 'pix'}
                    value="pix"
                    id="pix"
                  />
                  <label className="text-xl" htmlFor="pix">
                    Pix
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
