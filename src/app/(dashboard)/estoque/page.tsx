import { getProductsByCategory } from '@/actions/products'
import EstoqueClient from './EstoqueClient'

export default async function EstoquePage(){
  // Faz a Query no PostgreSQL antes da página carregar no navegador
  const defaultCategory = 'Supermercado'
  const response = await getProductsByCategory(defaultCategory);
  const initialProducts = response.success && response.data ? response.data : [];

  // Entrega os dados prontos para a interface interativa
  return <EstoqueClient initialProducts={initialProducts} defaultCategory={defaultCategory}/>
}