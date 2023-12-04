import { User } from '@/types/common'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials) {
					return null
				}
				try {
					const { rows } = await sql<User>`SELECT * FROM users WHERE email=${
						credentials.email as string
					};`
					const foundUser = rows[0]

					if (foundUser) {
						const match = await bcrypt.compare(
							credentials.password as string,
							foundUser.password ?? ''
						)

						if (match) {
							const authorizedUser = { ...foundUser }
							delete authorizedUser.password

							return foundUser
						}
					}
				} catch (error) {
					console.log('🦍 error', error)
				}
				return null
			},
		}),
	],
	callbacks: {
		async signIn({ account }) {
			if (account?.provider === 'credentials') return true
			return false
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.role = (user as User).role
			}
			return token
		},
		async session({ session, token }) {
			if (session?.user && token?.id) {
				const userSession = { ...session.user } as User
				userSession.id = token.id as string
				userSession.role = (token.role as string) ?? ''
				session.user = userSession
			}
			return session
		},
	},
} satisfies NextAuthOptions)

export { handler as GET, handler as POST }
