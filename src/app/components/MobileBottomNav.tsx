'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Package, DollarSign, Settings, MapPin, Users } from "lucide-react"

export default function MobileBottomNav(){
  const pathName = usePathname()
  const navItems = [
    { name: 'Estoque', href:'/estoque', icon: Package},
    { name: 'Financeiro', href:'financeiro', icon: DollarSign},
    { name: 'Localização', href:'/usuarios', icon: MapPin},
    { name: 'Usuários', href:'/usuarios', icon: Users},
    { name: 'Configurações', href:'/configuracoes', icon: Settings},
  ]

  return (
    <nav className="md:hidden shrink-0 fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 z-50 flex items-center justify-around pb-safe">
      {navItems.map((item) => {
        const isActive = pathName.includes(item.href)
        const Icon = item.icon

        return (
          <Link 
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}
          >
            <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2}/>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}