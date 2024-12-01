import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { v4 as uuidv4 } from 'uuid'
import { Minus, Plus, Trash } from '@phosphor-icons/react'

import Parse from 'parse/dist/parse.min.js'

import { Header } from '../../components/header'

import { useMemo, useState } from 'react'

import { useCartStore } from '../../store/useCartStore'
import { useClientStore } from '../../store/useClientStore'

import { printPrice } from '../../utils/printPrice'

function Cart() {
  const navigate = useNavigate()

  const [discount, setDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('creditCard')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingCouponCode, setIsLoadingCouponCode] = useState(false)

  const { client, setClient } = useClientStore((state) => ({
    client: state.client,
    setClient: state.setClient,
  }))

  const {
    cart,
    decrementProductQuantity,
    incrementProductQuantity,
    removeProductFromCart,
    clearCart,
  } = useCartStore((state) => ({
    cart: state.cart,
    incrementProductQuantity: state.incrementProductQuantity,
    decrementProductQuantity: state.decrementProductQuantity,
    removeProductFromCart: state.removeProductFromCart,
    clearCart: state.clearCart,
  }))

  const subtotal = useMemo(() => {
    return cart.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
  }, [cart])

  const total = useMemo(() => {
    return subtotal + 10 - discount
  }, [discount, subtotal])

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className="flex w-full p-10 gap-10">
        {cart.length > 0 ? (
          <>
            <div className="w-2/3 flex flex-col gap-3">
              <h3 className="text-xl font-semibold">CARRINHO</h3>
              <div className="border border-bg-slate-100 rounded bg-white">
                <table className="w-full text-left text-sm font-semibold">
                  <thead className="border-b-[1px] border-b-bg-slate-100">
                    <tr>
                      <th className="py-3 px-5">Produto</th>
                      <th className="py-3 px-5">Quantidade</th>
                      <th className="py-3 px-5">Valor Total</th>
                      <th className="py-3 px-5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => (
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
                            <button
                              onClick={() => {
                                decrementProductQuantity(product)
                              }}
                            >
                              <Minus className="text-orange-500 hover:text-orange-700 duration-300" />
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => {
                                incrementProductQuantity(product)
                              }}
                            >
                              <Plus className="text-orange-500 hover:text-orange-700 duration-300" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-5">
                          {printPrice.format(product.price * product.quantity)}
                        </td>
                        <td className="py-3 px-5">
                          {printPrice.format(product.price * product.quantity)}
                        </td>
                        <td className="py-3 px5">
                          <button
                            onClick={() => {
                              removeProductFromCart(product)
                            }}
                          >
                            <Trash size={24} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex py-10 px-20 gap-20">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-xl m-0">
                        Código do Cupom
                      </h3>
                      <span className="text-xs">
                        Entre com o código para ganhar o desconto
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-slate-100" />
                    <div className="flex items-center justify-between w-full h-14 border border-bg-slate-100 rounded px-3">
                      <input
                        placeholder="Código do Cupom"
                        onChange={(e) => {
                          setCouponCode(e.target.value)
                        }}
                        className="border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                      />
                      <button
                        className="bg-orange-400 text-white rounded py-2 px-5 hover:bg-orange-500 duration-300"
                        onClick={async () => {
                          setIsLoadingCouponCode(true)
                          setDiscount(0)

                          const query = new Parse.Query('CouponCode')

                          query.equalTo('code', couponCode)

                          const responseQuery = await query.first()

                          if (responseQuery) {
                            const couponCodeJson = responseQuery.toJSON()

                            const { discountValue } = couponCodeJson

                            setDiscount(Number(discountValue))

                            toast.success('Cupom aplicado com sucesso')
                          } else {
                            toast.error('Cupom inválido')
                          }

                          setIsLoadingCouponCode(false)
                        }}
                      >
                        {isLoadingCouponCode ? (
                          <div
                            className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent rounded-full"
                            role="status"
                            aria-label="loading"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <>Aplicar</>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="w-52 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold">
                          {printPrice.format(subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Frete</span>
                        <span className="font-bold">
                          {printPrice.format(10)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Desconto</span>
                        <span className="font-bold">
                          {printPrice.format(discount)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-[2px] bg-slate-100" />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">
                        {printPrice.format(total)}
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
                        name="paymentMethod"
                        checked={paymentMethod === 'creditCard'}
                        value="creditCard"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
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
                        checked={paymentMethod === 'bankSlip'}
                        value="bankSlip"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
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
                        checked={paymentMethod === 'pix'}
                        value="pix"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
                        id="pix"
                      />
                      <label className="text-xl" htmlFor="pix">
                        Pix
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className={`w-full h-12 bg-orange-400 text-white rounded hover:bg-orange-500 duration-300`}
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true)
                    const Client = new Parse.Object('Client')
                    Client.set('objectId', client.objectId)

                    const orders = JSON.parse(client.orders) || []

                    orders.push({
                      products: cart,
                      subtotal,
                      frete: 10,
                      discount,
                      couponCode: discount > 0 ? couponCode : '',
                      total,
                      client,
                      paymentMethod,
                      name: `Pedido ${orders.length + 1}`,
                      id: uuidv4(),
                    })

                    Client.set('orders', JSON.stringify(orders))

                    await Client.save()

                    setClient({
                      ...client,
                      orders: JSON.stringify(orders),
                    })

                    clearCart()

                    navigate('/')
                    setIsSubmitting(false)
                  }}
                >
                  {isSubmitting ? (
                    <div
                      className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <>Comprar</>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>O carrinho está vazio</div>
        )}
      </div>
    </div>
  )
}

export default Cart
