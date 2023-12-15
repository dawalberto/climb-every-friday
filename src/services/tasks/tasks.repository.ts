import { sql } from '@vercel/postgres'

export const getTasks = async () => {
	try {
		const { rows } = await sql<GetTask[]>`
			SELECT tasks.*, users.name as created_by_name
			FROM tasks
			INNER JOIN users ON tasks.created_by = users.id
			ORDER BY priority DESC, created_at ASC;
		`
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

export const deleteTask = async (taskId: Pick<Task, 'id'>['id']) => {
	try {
		const result = await sql<Task>`DELETE FROM tasks WHERE id = ${taskId};`
		return result
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
