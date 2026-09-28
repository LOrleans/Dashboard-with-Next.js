import { getProducts} from '@/actions/products'
import EstoqueClient from './EstoqueClient'

export default async function EstoquePage(){
  // Faz a Query no PostgreSQL antes da página carregar no navegador
  const productsDB = await getProducts();

  // Entrega os dados prontos para a interface interativa
  return <EstoqueClient initialProducts={productsDB} />
}