import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password"}
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: {email: credentials.email}
        })

        if(!user) return null

        const isValidPassword = await bcrypt.compare(credentials.password, user.password)

        if(!isValidPassword) return null

        return { id: user.id.toString(), name: user.name, email: user.email}
      }
    })
  ],
  pages: {
    signIn: '/login', // rota para onde o usuario será redirecionado quando precisar fazer login
  },
  session: {
    strategy: "jwt" // tokens jwt 
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}