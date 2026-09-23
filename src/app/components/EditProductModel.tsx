import {useState, useEffect } from 'react'
import { Product } from '@/types/Product'

interface EditProductModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (editedProduct: Product) => void;
  currentProduct: Product | null;
}

export default function EditProductModel({isOpen, onClose, onConfirm, currentProduct}: EditProductModelProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if(currentProduct) {
      setName(currentProduct.name)
      setQuantity(currentProduct.quantity)
      setPrice(currentProduct.price)
    }
  }, [currentProduct])

  function handleEditProduct(){
    if(!currentProduct || !name || !quantity || !price) return;

    const editedProduct: Product = {
      id: currentProduct.id,
      name,
      quantity,
      price
    } 

    onConfirm(editedProduct);
    onClose();
  }

  if(!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>Edit Product</h2>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
          </div>
          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Quantity</label>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none' />
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                step='0.01'
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none' />
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button 
            className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium hover:cursor-pointer' 
            onClick={onClose}>
              Cancel
          </button>
          <button 
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer' 
            onClick={handleEditProduct}>
              Save
          </button>
        </div>
      </div>
    </div>
  )
}