'use client'

import { remove, update, usePerformActionByApi } from '@/lib/api'
import { tasksEndpoint } from '..'

export const useTaskActions = (taskId: Pick<Task, 'id'>['id']) => {
	const { actionRunning, performAction } = usePerformActionByApi(tasksEndpoint)

	const deleteTask = () => {
		performAction(
			() => remove(tasksEndpoint, { taskId }),
			'Task deleted successfully',
			'Error deleting task'
		)
	}

	const updateTaskPriority = (priority: number) => {
		performAction(
			() => update(`${tasksEndpoint}?priority`, { taskId, priority }),
			'Task priority updated successfully',
			'Error updating task priority'
		)
	}

	return { actionRunning, deleteTask, updateTaskPriority }
}
