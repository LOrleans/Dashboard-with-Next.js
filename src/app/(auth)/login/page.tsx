'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage({}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    
    if(result?.error){
      setError('Email ou senha incorretos.')
      setLoading(false)
    } else {
      router.push('/estoque')
    }
  }

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm'>
      <div className='text-center mb-8 flex flex-col items-center justify-center gap-6'>
        <Image 
          src='/Blue-logo-azul-estendido.png'
          alt='Logo da Blue'
          width={180}
          height={60}
          className='object-contain'
        />
        <h2 className='text-xl font-medium text-gray-800'>Faça login</h2>
      </div> 

      {error && (
        <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center'>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className='space-y-4 w-full'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            required
          />
        </div>

        <button 
          type='submit'
          disabled={loading}
          className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6 disabled:opacity-70 hover:cursor-pointer'
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className='mt-6 text-center text-sm text-gray-600'>
        Ainda não tem uma conta?{' '}
        <Link href="/cadastro" className='text-blue-600 hover:underline font-medium'>Cadastre-se</Link>
      </p>
    </div>
  )
}