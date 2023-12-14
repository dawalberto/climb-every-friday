'use client'

import { Button } from '@/components'
import { post } from '@/lib'
import { tasksEndpoint } from '@/services/tasks/tasks.endpoints'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const CreateTask = () => {
	const { data } = useSession()
	const { user } = data ?? {}
	const [taskName, setTaskName] = useState<Pick<Task, 'name'>['name']>('')
	const [createTaskState, setCreateTaskState] = useState({ loading: false, error: false })

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			setCreateTaskState({ loading: true, error: false })
			const response = await post(tasksEndpoint, {
				taskName,
				userId: (user as User).id ?? '',
			})
			if (!response.ok) {
				toast.error('Error creating task')
				setCreateTaskState({ loading: false, error: true })
				return
			}
			toast.success('Task created successfully')
			setCreateTaskState({ loading: false, error: false })
			setTaskName('')
			mutate(tasksEndpoint)
		} catch (error) {
			toast.error('Error creating task' + error)
			setCreateTaskState({ loading: false, error: true })
		}
	}

	return (
		<form className='flex flex-col shadow-md sm:flex-row' onSubmit={handleOnSubmit}>
			<input
				type='text'
				placeholder='Task'
				className={clsx(
					'border-2 text-xl focus:border-amber-400 focus:ring-0 sm:w-[90%]',
					'rounded-t-md border-b-0',
					'sm:rounded-l-md sm:rounded-r-none sm:border-b-2 sm:border-r-0',
					createTaskState.error && 'border-red-500',
					!createTaskState.error && 'border-amber-900'
				)}
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
				required
			/>
			<Button
				buttonStyle='primary'
				className={clsx(
					'flex-1 border-2',
					'rounded-b-md border-t-0',
					'sm:rounded-l-none sm:rounded-r-md sm:border-l-0 sm:border-t-2',
					createTaskState.error && 'border-red-500',
					!createTaskState.error && 'border-amber-900'
				)}
				disabled={createTaskState.loading}
				type='submit'
			>
				<>
					{createTaskState.loading ? (
						<ImSpinner2 className='animate-spin' />
					) : (
						<HiOutlinePlus />
					)}
					<span>Create</span>
				</>
			</Button>
		</form>
	)
}
