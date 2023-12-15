'use client'

import { remove } from '@/lib'
import { tasksEndpoint } from '@/services'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp, HiOutlineTrash } from 'react-icons/hi'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const Task = ({ task }: { task: GetTask }) => {
	const { name, description, priority, created_by_name, created_at } = task
	const [actionRunning, setActionRunning] = useState(false)

	const deleteTask = async () => {
		setActionRunning(true)
		try {
			const response = await remove(tasksEndpoint, {
				taskId: task.id,
			})
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			mutate(tasksEndpoint)
			toast.success('Task deleted successfully')
		} catch (error) {
			toast.error('Error deleting task')
		} finally {
			setActionRunning(false)
		}
	}

	return (
		<AnimatePresence mode='wait'>
			<motion.div initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}>
				<div
					className={clsx(
						'bg-glassmorphism relative flex gap-6 rounded-md p-4 shadow-md drop-shadow-md',
						actionRunning && 'cursor-progress opacity-50'
					)}
				>
					<span
						title='Priority'
						className='flex-center bg-primary-gradient absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full text-white'
					>
						{priority}
					</span>
					<input
						type='checkbox'
						name='done'
						disabled={actionRunning}
						title='Done'
						className='flex h-6 w-6 flex-none cursor-pointer self-center rounded-md border-none checked:bg-amber-500 hover:checked:bg-amber-600 focus:border-amber-400 focus:ring-0 focus:checked:bg-amber-700'
					/>
					<div className='flex flex-1 flex-col gap-2'>
						<div className='flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-between'>
							<input
								type='text'
								className='flex-1 border-none bg-transparent text-xl focus:ring-0'
								value={name}
							/>
							<div className='flex-center flex w-fit gap-2 self-end sm:self-start'>
								<button
									disabled={actionRunning}
									title='Prioritize'
									className={taskActionButtonStyle}
								>
									<HiChevronUp />
								</button>
								<button
									disabled={actionRunning}
									title='Deprioritize'
									className={taskActionButtonStyle}
								>
									<HiChevronDown />
								</button>
								<button
									disabled={actionRunning}
									title='Delete'
									onClick={deleteTask}
									className={taskActionButtonStyle}
								>
									<HiOutlineTrash />
								</button>
							</div>
						</div>
						{description && (
							<textarea
								name=''
								id=''
								cols={30}
								rows={5}
								value={description}
								disabled={actionRunning}
								className='border-none bg-transparent focus:ring-0'
							/>
						)}
						<div className='flex flex-col justify-end gap-0.5 text-right text-base opacity-70 sm:flex-row'>
							<span className='sm:mr-2 sm:border-r-2 sm:border-amber-300 sm:pr-2'>
								{created_by_name}
							</span>
							<span>{new Date(created_at ?? '').toLocaleString()}</span>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

const taskActionButtonStyle =
	'bg-glassmorphism flex-center flex h-8 w-8 rounded-md shadow-md drop-shadow-md hover:shadow-xl hover:drop-shadow-xl'
