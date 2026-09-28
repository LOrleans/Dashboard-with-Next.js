export default function AuthLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Lado Esquerdo (Imagem) */}
      <div 
        className='hidden lg:flex lg:w-2/3 bg-blue-600 bg-cover bg-center relative'
        style={{backgroundImage: "url('/bancodedados.jpg')"}}
      />
      {/* Lado Direito (Formulário) */}
      <main className='flex flex-col justify-center items-center w-full lg:w-1/3 p-4 sm:p-8'> 
        {children}
      </main>
    </div>
  )
}