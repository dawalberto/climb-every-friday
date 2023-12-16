import {
	createTask,
	deleteTask,
	getTasks,
	updateTaskDescription,
	updateTaskName,
	updateTaskPriority,
	updateTaskState,
} from '@/services'

export const POST = async (request: Request) => {
	const taskToCreate = (await request.json()) as UpdateTask & { userId: Pick<User, 'id'>['id'] }

	if (!taskToCreate) {
		throw new Error('🦍 ❌ No task to create')
	}
	if (!taskToCreate.name) {
		throw new Error('🦍 ❌ No task name')
	}
	if (!taskToCreate.userId) {
		throw new Error('🦍 ❌ No user id')
	}

	try {
		const { rowCount } = await createTask(taskToCreate.userId, taskToCreate.name)
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
	const taskToDelete = (await request.json()) as UpdateTask

	if (!taskToDelete) {
		throw new Error('🦍 ❌ No task to delete')
	}
	if (!taskToDelete.id) {
		throw new Error('🦍 ❌ No task id')
	}

	try {
		const { rowCount } = await deleteTask(taskToDelete.id)
		if (rowCount !== 1) throw new Error('🦍 ❌ Could not delete task')

		return Response.json({ message: '🦍 ✅ Task deleted' })
	} catch (error) {
		return Response.json({ message: '🦍 ❌ Error deleting task' })
	}
}

export const PUT = async (request: Request) => {
	const taskToUpdate = (await request.json()) as UpdateTask

	if (!taskToUpdate) {
		throw new Error('🦍 ❌ No task to update')
	}

	try {
		if (!taskToUpdate.id) {
			throw new Error('🦍 ❌ No task id')
		}

		if (taskToUpdate.priority === undefined && taskToUpdate.name && taskToUpdate.description) {
			throw new Error('🦍 ❌ No data to update')
		}

		if (taskToUpdate.priority !== undefined) {
			const { rowCount } = await updateTaskPriority(taskToUpdate.id, taskToUpdate.priority)
			if (rowCount !== 1) throw new Error('🦍 ❌ Could not update task')

			return Response.json({ message: '🦍 ✅ Task priority updated' })
		}

		if (taskToUpdate.name !== undefined) {
			const { rowCount } = await updateTaskName(taskToUpdate.id, taskToUpdate.name)
			if (rowCount !== 1) throw new Error('🦍 ❌ Could not update task')

			return Response.json({ message: '🦍 ✅ Task name updated' })
		}

		if (taskToUpdate.description !== undefined) {
			const { rowCount } = await updateTaskDescription(
				taskToUpdate.id,
				taskToUpdate.description
			)
			if (rowCount !== 1) throw new Error('🦍 ❌ Could not update task')

			return Response.json({ message: '🦍 ✅ Task description updated' })
		}

		if (taskToUpdate.done !== undefined) {
			const { rowCount } = await updateTaskState(taskToUpdate.id, taskToUpdate.done)
			if (rowCount !== 1) throw new Error('🦍 ❌ Could not update task')

			return Response.json({ message: '🦍 ✅ Task state updated' })
		}

		return Response.json({ message: '🦍 ❌ No update executed' })
	} catch (error) {
		console.log('🦊 error', error)
		return Response.json({ message: '🦍 ❌ Error updating task' })
	}
}
