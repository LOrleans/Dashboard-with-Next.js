'use client'
import { produtosMock, tableHeaders } from '@/lib/estoque'
import { useState } from 'react'
import DeleteProductModel from '../components/DeleteProductModel'
import AddProductModel from '@/app/components/AddProductModel'
import EditProductModel from '@/app/components/EditProductModel'
import { NewProduct, Product } from '@/types/Product'

export default function Estoque() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConfirmDeleteProdutoModalOpen, setIsConfirmDeleteProdutoModalOpen] = useState(false)
  const [products, setProducts] = useState(produtosMock)
  const [productId, setProductId] = useState<number | null>(null)

  function handleAddProduct(newProduct: NewProduct) {
    const productWithId = {
      id: products.length + 1,
      ...newProduct
    }
    setProducts([...products, productWithId]);
    setIsModalOpen(false);
  }

  function handleDeleteProduct(id: number | null) {
    if(id === null) return;
    setProducts(products.filter(product => product.id !== id));
    setIsConfirmDeleteProdutoModalOpen(false);
  }

  const selectedProduct = products.find(prod => prod.id === productId) ?? null

  function handleEditProduct(editedProduct: Product) {
    const updatedProducts = products.map(product => product.id === editedProduct.id ? editedProduct : product)
    setProducts(updatedProducts)
    setIsEditModalOpen(false)
    setProductId(null)
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>Controle de Estoque</h1>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          + Adicionar Produto
        </button>
      </div>
      {/* Tabela */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              {tableHeaders.map(header => (
                <th key={header} className='p-4 border-b border-gray-300'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className='p-4 border-b border-gray-200'>{product.id}</td>
                <td className='p-4 border-b border-gray-200'>{product.name}</td>
                <td className='p-4 border-b border-gray-200'>{product.quantity}</td>
                <td className='p-4 border-b border-gray-200'>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                <td className='p-4 border-b border-gray-200'>
                  <div className='flex gap-2 my-1'>
                    <button 
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
                      onClick={() => {
                        setProductId(product.id)
                        setIsEditModalOpen(true)
                      }}
                    >
                      Editar
                    </button>
                    <button 
                      className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                      onClick={() => {
                        setProductId(product.id)
                        setIsConfirmDeleteProdutoModalOpen(true)
                      }}
                    >
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de Adicionar Produto */}
      <AddProductModel 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddProduct}
      />
      {/* Modal de Deletar Produto */}
      <DeleteProductModel
        isOpen={isConfirmDeleteProdutoModalOpen}
        onClose={() => setIsConfirmDeleteProdutoModalOpen(false)}
        onConfirm={() => handleDeleteProduct(productId)}
      />
      {/* Modal de Editar Produto */}
      <EditProductModel 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEditProduct}
        currentProduct={selectedProduct}
      />
    </div>
  )
}