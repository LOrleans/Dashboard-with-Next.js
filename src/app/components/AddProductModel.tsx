import { useState } from 'react'
import { NewProduct } from "@/types/Product";

interface AddProductModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: NewProduct) => void;
}

export default function AddProductModel({isOpen, onClose, onConfirm}: AddProductModelProps) {
  const [name, setName] = useState('')  
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  
  function handleAddProduct() {
    const newProduct: NewProduct = {
      name,
      quantity,
      price
    }

    if(name.trim() === '') return;

    onConfirm(newProduct)
    setName('')
    setQuantity(0)
    setPrice(0)
    onClose()
  }

  if(!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      {/* Caixa do Modal */}
      <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>Adicionar Novo Produto</h2>

        {/* Campos do Formulário */}
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Nome do Produto</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Ex: Mouse ReDragon Cobra' 
              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
          </div>
          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Quantidade</label>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder='Ex: 10'
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none' />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Preço</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                step='0.01'
                placeholder='120.00'
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none' />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className='mt-6 flex justify-end gap-3'>
          <button 
            className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium hover:cursor-pointer' 
            onClick={onClose}>
              Cancelar
          </button>
          <button 
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer' 
            onClick={handleAddProduct}>
              Salvar
          </button>
        </div>
      </div>
    </div>
  )
}