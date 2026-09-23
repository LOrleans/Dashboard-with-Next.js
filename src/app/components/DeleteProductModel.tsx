interface DeleteProductModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModel({isOpen, onClose, onConfirm}: DeleteProductModelProps) {
  if(!isOpen) return null;
  
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      {/* Caixa do Modal */}
      <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>Tem certeza que deseja deletar o produto?</h2>

        {/* Botões de Ação */}
        <div className='mt-6 flex justify-end gap-3'>
          <button 
            className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium hover:cursor-pointer' 
            onClick={onClose}>
              Cancelar
          </button>
          <button 
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer' 
            onClick={onConfirm}>
              Deletar
          </button>
        </div>
      </div>
    </div>
  )
}