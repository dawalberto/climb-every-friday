'use client'

import { remove, update, usePerformActionByApi } from '@/lib/api'
import { tasksEndpoint } from '..'

export const useTaskActions = (id: Pick<Task, 'id'>['id']) => {
	const { actionRunning, performAction } = usePerformActionByApi(tasksEndpoint)

	const deleteTask = () => {
		performAction({
			action: () => remove(tasksEndpoint, { id }),
			successMessage: 'Task deleted successfully',
			errorMessage: 'Error deleting task',
		})
	}

	const updateTaskPriority = (priority: Pick<UpdateTask, 'priority'>['priority']) => {
		performAction({
			action: () => update(`${tasksEndpoint}`, { id, priority }),
			successMessage: 'Task priority updated successfully',
			errorMessage: 'Error updating task priority',
		})
	}

	const updateTaskName = (name: Pick<UpdateTask, 'name'>['name']) => {
		performAction({
			action: () => update(`${tasksEndpoint}`, { id, name }),
			successMessage: 'Task name updated successfully',
			errorMessage: 'Error updating task name',
			toastOnSuccess: false,
		})
	}

	const updateTaskDescription = (description: Pick<UpdateTask, 'description'>['description']) => {
		performAction({
			action: () => update(`${tasksEndpoint}`, { id, description }),
			successMessage: 'Task description updated successfully',
			errorMessage: 'Error updating task description',
			toastOnSuccess: false,
		})
	}

	const updateTaskState = (done: Pick<UpdateTask, 'done'>['done']) => {
		performAction({
			action: () => update(`${tasksEndpoint}`, { id, done }),
			successMessage: 'Task state updated successfully',
			errorMessage: 'Error updating task',
			toastOnSuccess: done,
		})
	}

	return {
		actionRunning,
		deleteTask,
		updateTaskPriority,
		updateTaskName,
		updateTaskDescription,
		updateTaskState,
	}
}
