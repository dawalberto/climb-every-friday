'use server'

import { Route } from '@/lib/models/routes'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export const getRoutesByBoulderId = async (boulderId: Pick<Boulder, 'id'>['id']) => {
	try {
		const { rows } =
			await sql<Route>`SELECT * FROM routes WHERE boulder_id = ${boulderId} ORDER BY grade DESC;`
		return rows
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const updateRoute = async ({
	pathToRevalidateAndRedirectAfterAction,
	route,
}: {
	pathToRevalidateAndRedirectAfterAction?: string
	route: Route
}) => {
	try {
		const { rows } = await sql<Route>`
			UPDATE routes
			SET
				name = ${route.name},
				grade = ${route.grade},
				star = ${route.star},
				crossing = ${route.crossing},
				sit = ${route.sit}
			WHERE id = ${route.id}
			RETURNING *;`

		if (pathToRevalidateAndRedirectAfterAction) {
			revalidatePath(pathToRevalidateAndRedirectAfterAction)
		}

		return rows[0]
	} catch (error) {
		console.log('🦊 error updating route 👉', error)
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
