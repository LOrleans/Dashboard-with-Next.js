'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HamburguerSVG } from '@/app/components/svgs'
import Logo from '/Blue-logo-png.png'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function Sidebar({}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <aside className='hidden md:flex flex-col w-64 blue-600 text-white font-bold text-xl rounded-2xl p-4 shadow-lg h-full'>
      <div className={`
        /* Cores, bordas e padding */
        flex flex-col w-64 px-4 pb-6 pt-16 md:py-6 rounded-2xl shadow-lg bg-blue-500 text-white font-bold text-xl
        /* Mobile */
        fixed z-40 inset-y-4 left-4 transition-transform duration-300
        /* Desktop */
        md:static md:inset-auto md:h-full 
      `}>
        <div className='flex items-center gap-3 mb-8 px-2'>
          <div className='shrink-0 p-1 px-4 rounded-lg'>
            <Image 
              src='/Blue-logo-branco.png' 
              alt='Logo da Blue'
              width={170}
              height={170}
              className='object-contain'
            />
          </div>
        </div>
        <ul className='space-y-2 mt-8 font-medium text-base'>
          <li>
            <Link 
              href='/home'
              className={`
                ${pathname === `/home` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
                block p-3 rounded-lg transition-colors
              `}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href='/estoque' 
              className={`
                ${pathname === `/estoque` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
                block p-3 rounded-lg transition-colors
              `}
            >
              Estoque
            </Link>
          </li>
          <li>
            <Link   
              href='/financeiro' 
              className={`
                ${pathname === `/financeiro` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
                block p-3 rounded-lg transition-colors
              `}
            >
              Financeiro
            </Link>
          </li>
          <li>
            <Link 
              href='/localizacao' 
              className={`
                ${pathname === `/localizacao` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
                block p-3 rounded-lg transition-colors
              `}
            >
              Localização
            </Link>
          </li>
          <li>
            <Link 
              href='/configuracoes' 
              className={`
                ${pathname === `/configuracoes` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
                block p-3 rounded-lg transition-colors
              `}
            >
              Configurações
            </Link>
          </li>
        </ul>

        {/* Área do Usuário e Botão de Logout*/} 
        <div className='mt-auto border-t border-blue-400 pt-4 flex flex-col gap3'>
          {status === "authenticated" && session?.user && (
            <div className='px-2 mb-2 font-normal'>
              <p className='text-sm font-semibold truncate text-white'>{session.user.name}</p>
              <p className='text-xs text-blue-200 truncate'>{session.user.email}</p>
            </div>
          )}

          <button 
            onClick={() => signOut({ callbackUrl: "/login"})}
            data-testid='botao-logout'
            className='flex items-center gap-2 w-full text-left p-3 rounded-lg bg-red-400 hover:bg-red-500 hover:text-white transition-colors text-base font-medium cursor-pointer'
          >
            <LogOut className='w-5 h-5' />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}