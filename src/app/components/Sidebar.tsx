'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HamburguerSVG } from '@/app/svg/svgs'
import Logo from '/Blue-logo-png.png'

export default function Sidebar({}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-700 rounded-md text-white shadow-md
          ${isOpen ? 'px-4' : ''}  
        `}
      >
        {isOpen ? 'X' : HamburguerSVG}
      </button>
      <div className={`
        /* Cores, bordas e padding */
        w-64 px-4 pb-6 pt-16 md:py-6 rounded-2xl shadow-lg bg-blue-500 text-white font-bold text-xl
        /* Mobile */
        fixed z-40 inset-y-4 left-4 transition-transform duration-300
        /* Desktop */
        md:static md:inset-auto md:h-full 
        /* Lógica condicional */
        ${isOpen ? 'translate-x-0' : 'translate-x-[-120%]'} md:translate-x-0
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
              href='/'
              className={`
                ${pathname === `/` ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-blue-100'}
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
        </ul>
      </div>
    </>
  );
}