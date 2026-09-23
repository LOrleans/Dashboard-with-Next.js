"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NewProduct, Product } from '@/types/Product'

export async function getProducts() {
  try {
    // Buscar todos os produtos pelo ID
    const products = await prisma.product.findMany({
      orderBy: {id: 'asc'}
    })
    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos: ', error);
    return [];
  }
}

export async function createProduct(data: NewProduct) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        price: data.price,
      }
    })

    // Recarregar a lista de produtos na página
    revalidatePath('/estoque')
  
    return { success: true, product: newProduct}
  } catch (error) {
    console.error('Erro ao cadastrar produto', error);
    return {
      success: false,
      error: 'Erro ao cadastrar produto',
    }
  }
}

export async function updateProduct(product: Product) {
  try {
    const updatedProduct = await prisma.product.update({
      where: {id: product.id},
      data: {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      }
    })
    revalidatePath('/estoque')
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Erro ao editar produto', error)
    return {
      success: false,
      error: 'Erro ao editar produto',
    }
  }
}

export async function deleteProduct(productId: number) {
  try {
    await prisma.product.delete({
      where: {id: productId}
    })
    revalidatePath('/estoque')
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar produto', error)
    return {
      success: false,
      error: 'Erro ao deletar produto',
    }
  }
}