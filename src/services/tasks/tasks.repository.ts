import { sql } from '@vercel/postgres'

export const getTasks = async () => {
	try {
		const { rows } = await sql<GetTask[]>`
			SELECT tasks.*, users.name as created_by_name
			FROM tasks
			INNER JOIN users ON tasks.created_by = users.id
			ORDER BY priority DESC, done_at ASC, created_at ASC;
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

export const updateTaskPriority = async (
	taskId: Pick<Task, 'id'>['id'],
	priority: Pick<Task, 'priority'>['priority']
) => {
	try {
		return await sql<Task>`UPDATE tasks SET priority = ${priority} WHERE id = ${taskId};`
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const updateTaskName = async (
	taskId: Pick<Task, 'id'>['id'],
	name: Pick<Task, 'name'>['name']
) => {
	try {
		return await sql<Task>`UPDATE tasks SET name = ${name} WHERE id = ${taskId};`
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const updateTaskDescription = async (
	taskId: Pick<Task, 'id'>['id'],
	description: Pick<Task, 'description'>['description']
) => {
	try {
		return await sql<Task>`UPDATE tasks SET description = ${description} WHERE id = ${taskId};`
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}

export const updateTaskState = async (
	taskId: Pick<Task, 'id'>['id'],
	done: Pick<Task, 'done'>['done']
) => {
	try {
		return await sql<Task>`UPDATE tasks SET done = ${done}, done_at = NOW() WHERE id = ${taskId};`
	} catch (error) {
		throw new Error('🦍 ❌ SQL error', { cause: error })
	}
}
