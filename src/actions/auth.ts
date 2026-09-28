"use server"

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function signinUser(data: { name: string, email: string, password: string}) {
  if(!data || !data.email || !data.password){
    return { success: false, error: "Todos os campos são obrigatórios."}
  }

  try {
    // 1. Verificar se email já existe
    const existingUser = await prisma.user.findUnique({ 
      where: {email: data.email }}
    )
    if(existingUser) {
      return { success: false, error: "Email já cadastrado."}
    } 

    // 2. Hashear a senha
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // 3. Salvar no banco de dados
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Erro interno ao criar usuário."}
  }
}

export async function loginUser(data: { email: string, password: string}) {
  if(!data.email || !data.password) {
    return { success: false, error: "Todos os campos são obrigatórios."}
  }

  try {
    // 1. Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email: data.email}
    })
    if(!user){
      return { success: false, error: "E-mail ou senha incorretos."}
    }
    // 2. Comparar a senha com hash do banco
    const passwordMatch = await bcrypt.compare(data.password, user.password)
    if(!passwordMatch) {
      return { success: false, error: "E-mail ou senha incorretos."}
    }
    // Credenciais validadas.
    // Criar sessão (JWT) seria o próximo passo, mas faremos isso depois.
    return { 
      success: true, 
      user: {id: user.id, name: user.name, email: user.email} }
  } catch (error) {
    return { success: false }
  }
}