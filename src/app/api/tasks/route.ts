import { createTask, deleteTask, getTasks, updateTaskPriority } from '@/services'

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

export const DELETE = async (request: Request) => {
	const taskToDelete = await request.json()

	if (!taskToDelete) {
		throw new Error('🦍 ❌ No task to delete')
	}
	if (!taskToDelete.taskId) {
		throw new Error('🦍 ❌ No task id')
	}

	try {
		const { rowCount } = await deleteTask(taskToDelete.taskId)
		if (rowCount !== 1) throw new Error('🦍 ❌ Could not delete task')

		return Response.json({ message: '🦍 ✅ Task deleted' })
	} catch (error) {
		return Response.json({ message: '🦍 ❌ Error deleting task' })
	}
}

export const PUT = async (request: Request) => {
	const taskToUpdate = await request.json()

	if (!taskToUpdate) {
		throw new Error('🦍 ❌ No task to update')
	}

	try {
		const { searchParams } = new URL(request.url)
		const updatePriority = searchParams.get('priority')

		if (updatePriority !== undefined) {
			if (!taskToUpdate.taskId) {
				throw new Error('🦍 ❌ No task id')
			}
			if (taskToUpdate.priority === undefined) {
				throw new Error('🦍 ❌ No priority')
			}
			const { rowCount } = await updateTaskPriority(
				taskToUpdate.taskId,
				taskToUpdate.priority
			)
			if (rowCount !== 1) throw new Error('🦍 ❌ Could not update task')

			return Response.json({ message: '🦍 ✅ Task updated' })
		}

		return Response.json({ message: '🦍 ❌ No update executed' })
	} catch (error) {
		console.log('🦊 error', error)
		return Response.json({ message: '🦍 ❌ Error updating task' })
	}
}
