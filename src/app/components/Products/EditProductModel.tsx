import {useState, useEffect } from 'react'
import { Product } from '@/types/Product'
import { updateProduct } from '@/actions/products';

interface EditProductModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (editedProduct: Product) => void;
  currentProduct: Product | null;
}

export default function EditProductModel({isOpen, onClose, onConfirm, currentProduct}: EditProductModelProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [unitMeasure, setUnitMeasure] = useState('kg')
  const [validationDate, setValidationDate] = useState('');
  const [dateMode, setDateMode] = useState<'day' | 'month'>('day');

  useEffect(() => {
    if(currentProduct) {
      setName(currentProduct.name)
      setQuantity(currentProduct.quantity)
      setCategory(currentProduct.category)
      setUnitMeasure(currentProduct.unitMeasure ?? 'kg')
      setValidationDate(currentProduct.validationDate?.toISOString().split('T')[0] || '')
    }
  }, [currentProduct])

  async function handleEditProduct(){
    if(!currentProduct || !name || !quantity || !category || !unitMeasure || !validationDate) return;

    const editedProduct: Product = {
      id: currentProduct.id,
      name,
      quantity,
      category,
      unitMeasure,
      validationDate: validationDate
        ? dateMode === 'month'
          ? new Date(`${validationDate}-01`)
          : new Date(validationDate)
        : null,
      createdAt: currentProduct.createdAt,
      updatedAt: new Date(),
    }

    onConfirm(editedProduct)
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setQuantity(0)
    setCategory('')
    setUnitMeasure('')
    setValidationDate('')
    setDateMode('day')
    onClose()
  }

  if(!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <form onSubmit={handleEditProduct} className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>Editar Item</h2>

        {/* Campos do Formulário */}
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Nome do Produto</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Ex: Macarrão' 
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
            </div>
            <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Categoria</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'>
                <option value="Supermercado">Supermercado</option>
                <option value="Farmácia">Farmácia</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Higiene">Higiene</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            {/* <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Subcategoria</label>
              <select 
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'>
                <option value="" disabled>Selecione a Subcategoria</option>
                {category === 'Supermercado' && (
                  <>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
                {category === 'Farmácia' && (
                  <>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
                {category === 'Limpeza' && (
                  <>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
                {category === 'Higiene' && (
                  <>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
                {category === 'Outros' && (
                  <>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Outros">Outros</option>
                  </>
                )}
              </select>
            </div> */}
          </div>
          <div className='flex gap-4'>
            <div className='flex w-1/2 gap-2'>
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
                <label className='block text-sm font-medium text-gray-700 mb-1'>Unidade de Medida</label>
                <select 
                  value={unitMeasure}
                  onChange={(e) => setUnitMeasure(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'>
                  <option value="kg">Kg</option>
                  <option value="cx">Caixa</option>
                  <option value="pct">Pacotes</option>
                  <option value="und">Unidade</option>
                </select>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='flex items-center justify-between mb-1'>
                <label className='block text-sm font-medium text-gray-700'>Data de Validade</label>
                <div className='flex rounded-md overflow-hidden border border-gray-300 text-xs'>
                  <button
                    type='button'
                    onClick={() => { setDateMode('day'); setValidationDate('') }}
                    className={`px-2 py-1 transition-colors ${
                      dateMode === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Dia/Mês/Ano
                  </button>
                  <button
                    type='button'
                    onClick={() => { setDateMode('month'); setValidationDate('') }}
                    className={`px-2 py-1 transition-colors ${
                      dateMode === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Mês/Ano
                  </button>
                </div>
              </div>
              <input 
                type={dateMode === 'month' ? 'month' : 'date'}
                value={validationDate}
                onChange={(e) => setValidationDate(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
            </div>
            {/* <div className='w-1/2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Preço</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                step='0.01'
                placeholder='120.00'
                className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none' />
            </div> */}
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button 
            className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium hover:cursor-pointer' 
            onClick={handleCancel}>
              Cancel
          </button>
          <button 
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer' 
            > 
              Save
          </button>
        </div>
      </form>
    </div>
  )
}