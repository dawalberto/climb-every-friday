import { sql } from '@vercel/postgres'

export const getBoulderByIdentifierName = async (
	identifierName: Pick<Boulder, 'identifier_name'>['identifier_name']
) => {
	try {
		const { rows } =
			await sql<Boulder>`SELECT * FROM boulders WHERE identifier_name = ${identifierName};`
		if (rows.length) {
			return rows[0]
		}
		return null
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
