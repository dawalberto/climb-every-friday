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
							const authorizedUser: any = { ...foundUser }
							delete authorizedUser.password

							authorizedUser.role = 'admin'
							return foundUser
						}
					}
				} catch (error) {}
				return null
			},
		}),
	],
	callbacks: {
		async signIn({ account }) {
			if (account?.provider === 'credentials') return true
			return false
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		// async authorized(params) {
		// 	return true
		// },
		async session({ session, token }) {
			if (session?.user) (session.user as any).role = token.role
			return session
		},
	},
} satisfies NextAuthOptions)

export { handler as GET, handler as POST }
