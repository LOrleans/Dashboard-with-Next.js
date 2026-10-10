import Image from 'next/image'

export default function MobileTopBar(){
  return (
    <div>
      <header className="md:hidden shrink-0 fixed w-full h-12 bg-blue-600 text-white flex items-center justify-center shadow-md px-4 rounded-b-2xl">
        <Image 
          src='/Blue-logo-branco.png' 
          alt='Blue-logo-branco.png' 
          width={100}
          height={100}
          className='object-contain'
        />
      </header>
    </div>
  )
}