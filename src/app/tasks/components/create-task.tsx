'use client'

import { Button } from '@/components/UI'
import { create } from '@/lib/api'
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
			const response = await create(tasksEndpoint, {
				name: taskName,
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
		<form
			className='flex flex-col shadow-lg drop-shadow-lg md:flex-row'
			onSubmit={handleOnSubmit}
		>
			<input
				type='text'
				placeholder='Task'
				className={clsx(
					'text-xl focus:border-amber-500 focus:ring-0 md:w-[90%]',
					'rounded-t-md',
					'border-r-0 md:rounded-l-md md:rounded-r-none',
					createTaskState.error && 'border-2 border-red-500',
					!createTaskState.error && 'border-none'
				)}
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
				required
			/>
			<Button
				buttonStyle='primary'
				className={clsx(
					'flex-1 px-4 py-2',
					'rounded-b-md rounded-t-none',
					'md:rounded-l-none md:rounded-r-md',
					createTaskState.error && 'border-2 border-red-500',
					!createTaskState.error && 'border-none'
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
