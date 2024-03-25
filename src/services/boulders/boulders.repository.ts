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

export const getBouldersBySectorId = async (sectorId: Pick<Boulder, 'sector_id'>['sector_id']) => {
	try {
		const { rows } = await sql<Boulder>`SELECT * FROM boulders WHERE sector_id = ${sectorId};`
		if (rows.length) {
			return rows
		}
		return null
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
