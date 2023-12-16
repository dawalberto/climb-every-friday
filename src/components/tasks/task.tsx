'use client'

import { useTaskActions } from '@/services'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp, HiOutlineTrash } from 'react-icons/hi'
import { useDebouncedCallback } from 'use-debounce'

const maxPriority = 5
const minPriority = 0

export const Task = ({ task }: { task: GetTask }) => {
	const { id, done, name, description, priority, created_by_name, created_at } = task
	const {
		actionRunning,
		deleteTask,
		updateTaskPriority,
		updateTaskName,
		updateTaskDescription,
		updateTaskState,
	} = useTaskActions(id)
	const [taskState, setTaskState] = useState(done)
	const [taskName, setTaskName] = useState(name)
	const [taskDescription, setTaskDescription] = useState(description)

	const updateTaskNameDebounced = useDebouncedCallback((newName) => {
		updateTaskName(newName)
	}, 3000)

	const updateTaskDescriptionDebounced = useDebouncedCallback((newDescription) => {
		updateTaskDescription(newDescription)
	}, 3000)

	return (
		<AnimatePresence mode='wait'>
			<motion.div initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}>
				<div
					className={clsx(
						'bg-glassmorphism relative flex gap-6 rounded-md p-4 shadow-md drop-shadow-md',
						actionRunning && 'cursor-progress opacity-50',
						taskState && 'opacity-70'
					)}
				>
					<span
						title='Priority'
						className={clsx(
							'flex-center absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full shadow-md drop-shadow-md',
							priorityClasses[priority ?? 0]
						)}
					>
						{priority}
					</span>
					<input
						type='checkbox'
						name='done'
						checked={taskState}
						onChange={({ target: { checked } }) => {
							setTaskState(checked)
							updateTaskState(checked)
						}}
						disabled={actionRunning}
						title='Done'
						className='flex h-6 w-6 flex-none cursor-pointer self-center rounded-md border-none checked:bg-amber-500 hover:checked:bg-amber-600 focus:border-amber-400 focus:ring-0 focus:checked:bg-amber-700'
					/>
					<div className='flex flex-1 flex-col gap-2'>
						<div className='flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-between'>
							<input
								type='text'
								className={clsx(
									taskState && 'line-through',
									'flex-1 border-none bg-transparent text-xl focus:ring-0 disabled:cursor-not-allowed'
								)}
								disabled={actionRunning || taskState}
								value={taskName}
								onChange={({ target: { value } }) => {
									setTaskName(value)
									updateTaskNameDebounced(value)
								}}
							/>
							<div className='flex-center flex w-fit gap-2 self-end sm:self-start'>
								<button
									disabled={
										actionRunning || taskState || priority === maxPriority
									}
									title='Prioritize'
									onClick={() => updateTaskPriority((priority ?? 0) + 1)}
									className={taskActionButtonStyle}
								>
									<HiChevronUp className='text-amber-600' />
								</button>
								<button
									disabled={
										actionRunning || taskState || priority === minPriority
									}
									title='Deprioritize'
									onClick={() => updateTaskPriority((priority ?? 0) - 1)}
									className={taskActionButtonStyle}
								>
									<HiChevronDown className='text-amber-600' />
								</button>
								<button
									disabled={actionRunning || taskState}
									title='Delete'
									onClick={deleteTask}
									className={taskActionButtonStyle}
								>
									<HiOutlineTrash className='text-amber-600' />
								</button>
							</div>
						</div>
						{!taskState && (
							<textarea
								cols={0}
								rows={0}
								value={taskDescription}
								onChange={({ target: { value } }) => {
									setTaskDescription(value)
									updateTaskDescriptionDebounced(value)
								}}
								disabled={actionRunning || taskState}
								className='border-none bg-transparent focus:ring-0 disabled:cursor-not-allowed'
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
	'bg-glassmorphism flex-center flex h-8 w-8 rounded-md shadow-md drop-shadow-md hover:shadow-xl hover:drop-shadow-xl disabled:cursor-not-allowed'

const priorityClasses = {
	[maxPriority]: 'bg-amber-600 text-white',
	[maxPriority - 1]: 'bg-amber-500 text-white',
	[maxPriority - 2]: 'bg-amber-400',
	[maxPriority - 3]: 'bg-amber-300',
	[maxPriority - 4]: 'bg-amber-200',
	[minPriority]: 'bg-amber-100',
}
