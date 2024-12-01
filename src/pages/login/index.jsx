import { useState } from 'react'
import { toast } from 'react-toastify'

import Parse from 'parse/dist/parse.min.js'

import { useClientStore } from '../../store/useClientStore'

import cupcakeImage from '../../assets/images.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setClient = useClientStore((state) => state.setClient)

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col gap-10 items-center">
        <img className='w-40 h-40' src={cupcakeImage} alt="Logo"/>
        <div className="flex flex-col gap-3">
          <input
            className="border border-slate-100 rounded h-9 w-96 hover:border-slate-300 duration-300 px-3"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            className="border border-slate-100 rounded h-9 w-96 hover:border-slate-300 duration-300 px-3"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
          />
        </div>
        <button
          className="bg-orange-400 hover:bg-orange-600 duration-300 w-full text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            const query = new Parse.Query('Client')

            query.equalTo('email', email)
            query.equalTo('password', password)

            const client = await query.first()

            if (!client) {
              toast.error('Crendenciais inválidas')
              return
            }

            setClient(client.toJSON())
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Login
