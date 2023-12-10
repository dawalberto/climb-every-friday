'use client'

import { Button } from '@/components'
import { createTask } from '@/services/tasks/api'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'
import { ImSpinner2 } from 'react-icons/im'

export default function Page() {
	const { data } = useSession()
	const { user } = data ?? {}
	const [taskName, setTaskName] = useState<Pick<Task, 'name'>['name']>('')
	const [createTaskState, setCreateTaskState] = useState({ loading: false, error: false })

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			setCreateTaskState({ loading: true, error: false })
			const response = await createTask({ taskName, userId: (user as User).id ?? '' })
			if (!response.ok) {
				setCreateTaskState({ loading: false, error: true })
				return
			}
			setCreateTaskState({ loading: false, error: false })
			setTaskName('')
		} catch (error) {
			console.log('🦊 error', error)
		}
	}

	return (
		<form className='flex flex-col sm:flex-row' onSubmit={handleOnSubmit}>
			<input
				type='text'
				placeholder='Task'
				className={clsx(
					'rounded-sm text-xl focus:border-amber-400 focus:ring-0 sm:w-[90%] sm:rounded-r-none sm:border-2 sm:border-r-0',
					createTaskState.error && 'border-red-500',
					!createTaskState.error && 'sm:border-amber-900'
				)}
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
				required
			/>
			<Button
				buttonStyle='primary'
				className={clsx(
					'flex-1 sm:rounded-l-none sm:border-2 sm:border-l-0',
					createTaskState.error && 'border-red-500',
					!createTaskState.error && 'sm:border-amber-900'
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
