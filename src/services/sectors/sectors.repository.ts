import { sql } from '@vercel/postgres'

export const getSectorByIdentifierName = async (
	identifierName: Pick<Sector, 'identifier_name'>['identifier_name']
) => {
	try {
		const { rows } =
			await sql<Sector>`SELECT * FROM sectors WHERE identifier_name = ${identifierName};`
		if (rows.length) {
			return rows[0]
		}
		return null
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
