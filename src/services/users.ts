import { User } from '@/lib/types/user'
import { sql } from '@vercel/postgres'

export const getAllUsers = async () => {
	try {
		const { rows } = await sql<User>`SELECT * FROM users;`
		return rows
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const getUserByEmail = async (email: string) => {
	try {
		const { rows } = await sql<User>`SELECT * FROM users WHERE email=${email};`
		if (rows.length) {
			return rows[0]
		}
		return null
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
