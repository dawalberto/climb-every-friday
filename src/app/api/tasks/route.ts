import { createTask, getTasks } from '@/services'

// Create task
export const POST = async (request: Request) => {
	const taskToCreate = await request.json()

	if (!taskToCreate) {
		throw new Error('🦍 ❌ No task to create')
	}
	if (!taskToCreate.taskName) {
		throw new Error('🦍 ❌ No task name')
	}
	if (!taskToCreate.userId) {
		throw new Error('🦍 ❌ No user id')
	}

	try {
		const { rowCount } = await createTask(taskToCreate.userId, taskToCreate.taskName)
		if (rowCount !== 1) throw new Error('🦍 ❌ Could not create task')

		return Response.json({ message: '🦍 ✅ Task created' })
	} catch (error) {
		return Response.json({ message: '🦍 ❌ Error creating task' })
	}
}

export const GET = async () => {
	try {
		const tasks = await getTasks()
		return Response.json(tasks)
	} catch (error) {
		return Response.json({ message: '🦍 ❌ Error getting tasks' })
	}
}
