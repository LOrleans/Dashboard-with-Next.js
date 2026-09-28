'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signinUser } from '@/actions/auth'
import Image from 'next/image'
import Link from 'next/link'

export default function SigninPage({}) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSigninUser(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError('')

    if(password !== confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return;
    }
    
    const response = await signinUser({ name, email, password })
    if(response.success) {
      router.push('/login')
    } else {
      setError(response.error || 'Erro ao cadastrar')
      setLoading(false)
    }
  }

  // Renderização condicional para mostrar o campo de confirmação de senha
  useEffect(() => {
    if(password.length > 1) {
      setShowConfirmPassword(true)
    } else {
      setShowConfirmPassword(false)
    }
  }, [password])

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm'>
      <div className='text-center mb-8 flex flex-col items-center justify-center gap-6'>
        <Image 
          src='/Blue-logo-azul-estendido.png' 
          alt='Logo da Blue'
          width={180}
          height={60}
          className="object-contain"
        />
        <h2 className='text-xl font-medium text-gray-800'>Crie sua conta</h2>
      </div>

      {error && (
        <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center'>
          {error}
        </div>
      )}

      <form onSubmit={handleSigninUser} className='space-y-4 w-full'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Nome completo</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            required
          />
        </div>

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
          
        {showConfirmPassword && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Confirmar senha</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
              required
            />
          </div>
        )}

        <button 
          type='submit'
          disabled={loading}
          className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6 disabled:opacity-70 hover:cursor-pointer'
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className='mt-6 text-center text-sm text-gray-600'>
        Já tem uma conta?{' '}
        <Link href="/login" className='text-blue-600 hover:underline font-medium'>Faça login</Link>
      </p>
    </div>
  )
}