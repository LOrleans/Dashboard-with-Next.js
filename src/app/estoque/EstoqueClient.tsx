'use client'
import { useState } from 'react'
import DeleteProductModel from '../components/DeleteProductModel'
import AddProductModel from '@/app/components/AddProductModel'
import EditProductModel from '@/app/components/EditProductModel'
import { NewProduct, Product } from '@/types/Product'
import { createProduct, updateProduct, deleteProduct } from '@/actions/products'
import { tableHeaders } from '@/lib/estoque'

interface EstoqueClientProps {
  initialProducts: Product[];
}

export default function EstoqueClient({initialProducts}: EstoqueClientProps) {
  // Estados dos modais
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConfirmDeleteProdutoModalOpen, setIsConfirmDeleteProdutoModalOpen] = useState(false)
  // Estados dos dados
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [productId, setProductId] = useState<number | null>(null)

  // Estado do produto selecionado
  const selectedProduct = products.find(prod => prod.id === productId) ?? null
  
  // Funções de manipulação dos dados
  async function handleAddProduct(newProduct: NewProduct) {
    const response = await createProduct(newProduct);

    if(response.success && response.product){
      setProducts([...products, response.product])  
      setIsModalOpen(false)
      return;
    } else {
      alert('Erro ao salvar o produto no banco de dados.') // Criar modal de error
      setIsModalOpen(false)
      return;
    }
  }

  async function handleDeleteProduct(id: number | null) {
    if(id === null) return;
    const response = await deleteProduct(id) 
    
    if(response.success) {
      setProducts(products.filter(product => product.id !== id))
      setIsConfirmDeleteProdutoModalOpen(false);
      return;
    } else {
      alert('Erro ao deletar produto no banco de dados.')
      setIsConfirmDeleteProdutoModalOpen(false);
      return;
    }
  }

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
              <th className='p-4 border-b border-gray-300'>ID</th>
              <th className='p-4 border-b border-gray-300'>Nome</th>
              <th className='p-4 border-b border-gray-300'>Quantidade</th>
              <th className='p-4 border-b border-gray-300'>Preço</th>
              <th className='p-4 border-b border-gray-300'>Ações</th>
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