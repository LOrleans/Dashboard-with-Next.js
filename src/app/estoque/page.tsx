'use client'
import { useState } from 'react'

const produtosMock = [
  { id: 1, nome: 'Teclado Mecânico', quantidade: 45, preco: 350.00 },
  { id: 2, nome: 'Mouse Sem Fio', quantidade: 120, preco: 150.00 },
  { id: 3, nome: 'Monitor 27"', quantidade: 15, preco: 1200.00 },
  { id: 4, nome: 'Webcam Full HD', quantidade: 60, preco: 250.00 },
  { id: 5, nome: 'Headset Gamer', quantidade: 85, preco: 300.00 },
  { id: 6, nome: 'Cadeira Gamer', quantidade: 20, preco: 900.00 },
  { id: 7, nome: 'Mesa de Escritório', quantidade: 10, preco: 550.00 },
  { id: 8, nome: 'Notebook i5 10ª Ger', quantidade: 30, preco: 3500.00 },
  { id: 9, nome: 'SSD 240GB', quantidade: 150, preco: 200.00 },
  { id: 10, nome: 'HD Externo 1TB', quantidade: 70, preco: 400.00 },
  { id: 11, nome: 'Pen Drive 32GB', quantidade: 200, preco: 40.00 },
  { id: 12, nome: 'HD Interno 1TB', quantidade: 90, preco: 320.00 },
  { id: 13, nome: 'Memória RAM 8GB DDR4', quantidade: 180, preco: 180.00 },
  { id: 14, nome: 'Fonte 500W', quantidade: 50, preco: 280.00 },
  { id: 15, nome: 'Placa de Vídeo GTX 1650', quantidade: 25, preco: 1100.00 },
  { id: 16, nome: 'Placa-mãe LGA 1200', quantidade: 35, preco: 650.00 },
  { id: 17, nome: 'Processador Ryzen 5', quantidade: 22, preco: 850.00 },
  { id: 18, nome: 'Cooler CPU', quantidade: 120, preco: 120.00 },
  { id: 19, nome: 'Gabinete ATX', quantidade: 45, preco: 230.00 },
  { id: 20, nome: 'Mouse Gamer RGB', quantidade: 60, preco: 150.00 },
  { id: 21, nome: 'Teclado Gamer Mecânico', quantidade: 35, preco: 380.00 },
  { id: 22, nome: 'Microfone Condensador', quantidade: 40, preco: 280.00 },
  { id: 23, nome: 'Caixa de Som Bluetooth', quantidade: 75, preco: 220.00 },
  { id: 24, nome: 'Impressora Multifuncional', quantidade: 18, preco: 750.00 },
  { id: 25, nome: 'Scanner de Documentos', quantidade: 12, preco: 450.00 },
  { id: 26, nome: 'Roteador Wi-Fi', quantidade: 90, preco: 200.00 },
  { id: 27, nome: 'Switch 8 Portas', quantidade: 60, preco: 130.00 },
  { id: 28, nome: 'Extensão Elétrica', quantidade: 150, preco: 50.00 },
  { id: 29, nome: 'Filtro de Linha', quantidade: 110, preco: 60.00 },
  { id: 30, nome: 'No-Break 600VA', quantidade: 25, preco: 480.00 },
];

const tableHeaders = [
  'ID',
  'Nome',
  'Quantidade',
  'Preço',
  'Ações'
];

export default function Estoque() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
                <th className='p-4 border-b border-gray-300'>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {produtosMock.map(produto => (
              <tr key={produto.id}>
                <td className='p-4 border-b border-gray-200'>{produto.id}</td>
                <td className='p-4 border-b border-gray-200'>{produto.nome}</td>
                <td className='p-4 border-b border-gray-200'>{produto.quantidade}</td>
                <td className='p-4 border-b border-gray-200'>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}</td>
                <td className='p-4 border-b border-gray-200'>
                  <div className='flex gap-2 my-1'>
                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>Editar</button>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'>Deletar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de Adicionar Produto */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          {/* Caixa do Modal */}
          <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Adicionar Novo Produto</h2>

            {/* Campos do Formulário */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Nome do Produto</label>
                <input type="text" placeholder='Ex: Mouse ReDragon Cobra' className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
              </div>
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Quantidade</label>
                  <input type="number" placeholder='Ex: 10' className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
                <div className='w-1/2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Preço</label>
                  <input type="number" step='0.01' placeholder='120.00' className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className='mt-6 flex justify-end gap-3'>
              <button className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium hover:cursor-pointer' onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer' onClick={() => setIsModalOpen(false)}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}