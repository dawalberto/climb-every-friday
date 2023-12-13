import { sql } from '@vercel/postgres'

export const getTasks = async () => {
	try {
		const { rows } = await sql<Task>`SELECT * FROM tasks ORDER BY created_at DESC;`
		return rows
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const createTask = async (
	userId: Pick<User, 'id'>['id'],
	taskName: Pick<Task, 'name'>['name']
) => {
	try {
		const result =
			await sql<Task>`INSERT INTO tasks (name, created_by) VALUES (${taskName}, ${userId});`
		return result
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
