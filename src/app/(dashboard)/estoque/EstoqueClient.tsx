'use client'
import { useEffect, useState } from 'react'
import DeleteProductModel from '@/app/components/Models/DeleteProductModel'
import AddProductModel from '@/app/components/Models/AddProductModel'
import EditProductModel from '@/app/components/Models/EditProductModel'
import { NewProduct, Product } from '@/types/Product'
import { createProduct, updateProduct, deleteProduct, getProductsByCategory } from '@/actions/products'
import { Pen, Trash } from 'lucide-react'

interface EstoqueClientProps {
  initialProducts: Product[];
  defaultCategory: string;
}

export default function EstoqueClient({initialProducts, defaultCategory}: EstoqueClientProps) {
  // Estados dos modais
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConfirmDeleteProdutoModalOpen, setIsConfirmDeleteProdutoModalOpen] = useState(false)
  // Estados dos dados
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [productId, setProductId] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [updateProductsList, setUpdateProductsList] = useState(false)

  // Estado do produto selecionado
  const selectedProduct = products.find(prod => prod.id === productId) ?? null

  // Categorias para o seletor
  const categories = ['Supermercado', 'Farmácia', 'Limpeza', 'Higiene', 'Outros']

  // Filtra os produtos pela categoria ativa
  async function handleCategoryChange(category: string) {
    setActiveCategory(category);
    const response = await getProductsByCategory(category);
    if (response.success && response.data) {
      setProducts(response.data)
    }
  }

  // Funções de manipulação dos dados
  async function handleAddProduct(newProduct: NewProduct) {
    const response = await createProduct({ ...newProduct, category: newProduct.category || activeCategory});

    if(response.success && response.product){
      setProducts([...products, response.product as Product])  
      setUpdateProductsList(true)
      setIsModalOpen(false)
      return;
    } else {
      alert('Erro ao salvar o produto no banco de dados.') // Criar modal de error
      setIsModalOpen(false)
      return;
    }
  }
  async function handleEditProduct(editedProduct: Product) {
    const response = await updateProduct(editedProduct);

    if(response.success && response.product){
      const updatedProducts = products.map(product => product.id === editedProduct.id ? editedProduct : product)
      setProducts(updatedProducts)
      setUpdateProductsList(true)
      setIsEditModalOpen(false)
      return;
    } else {  
      alert('Erro ao editar o produto no banco de dados.') // Criar modal de error
      setIsEditModalOpen(false)
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

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg h-full flex flex-col">
      
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
        <h1 className='text-2xl font-bold text-gray-800'>Controle de Estoque</h1>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors hover:cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          + Adicionar Item
        </button>
      </div>

      {/* Seletor de Categorias */}
      <div className='flex flex-wrap justify-center md:justify-start gap-2 mb-6 border-b border-gray-200 pb-4'>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${activeCategory === category ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='p-4 border-b border-gray-300'>Item</th>
              <th className='p-4 border-b border-gray-300'>Quantidade</th>
              <th className='p-4 border-b border-gray-300'>Data de Validade</th>
              <th className='p-4 border-b border-gray-300'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td className='p-4 border-b border-gray-200'>Nenhum produto encontrado</td>
              </tr>
            ) : (
              products.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='p-4 border-b border-gray-200'>{product.name}</td>
                <td className='p-4 border-b border-gray-200'>{product.quantity} {product.unitMeasure === 'kg' ? 'Kg' : product.unitMeasure === 'cx' ? 'Caixa' : product.unitMeasure === 'pct' ? 'Pacotes' : 'Unidade'}</td>
                <td className='p-4 border-b border-gray-200'>{product.validationDate?.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) ?? '—'}</td> {/* Exibir apenas mês e ano, se existir a data. */}  
                <td className='p-4 border-b border-gray-200'>
                  <div className='flex gap-2 my-1'>
                    <button
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer'
                      onClick={() => {
                        setProductId(product.id)
                        setIsEditModalOpen(true)
                      }}
                    >
                      <Pen size={18} className='text-white'/>
                    </button>
                    <button 
                      className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer'
                      onClick={() => {
                        setProductId(product.id)
                        setIsConfirmDeleteProdutoModalOpen(true)
                      }}
                    >
                      <Trash size={18} className='text-white'/>
                    </button>
                  </div>
                </td>
              </tr>
            )))}
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