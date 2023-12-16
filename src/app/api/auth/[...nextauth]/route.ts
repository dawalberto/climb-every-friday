import { getUserByEmail } from '@/services'
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
					const user = await getUserByEmail(credentials.email as string)

					if (user) {
						const match = await bcrypt.compare(
							credentials.password as string,
							user.password ?? ''
						)

						if (match) {
							const authorizedUser = { ...user }
							delete authorizedUser.password

							return user
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
