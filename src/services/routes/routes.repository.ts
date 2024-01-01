import { Route } from '@/lib/models/routes'
import { sql } from '@vercel/postgres'

export const getRoutesByBoulderId = async (boulderId: Pick<Boulder, 'id'>['id']) => {
	try {
		const { rows } = await sql<Route>`SELECT * FROM routes WHERE boulder_id = ${boulderId};`
		return rows
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
