import { sql } from '@vercel/postgres'

export const insertTask = async (
	user_id: Pick<User, 'id'>['id'],
	taskName: Pick<Task, 'name'>['name']
) => {
	try {
		const result =
			await sql<Task>`INSERT INTO tasks (name, created_by) VALUES (${taskName}, ${user_id});`
		return result
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
