'use client'

import { tasksEndpoint } from '@/services/tasks/tasks.endpoints'
import { AnimatePresence, motion } from 'framer-motion'
import useSWR from 'swr'
import { Spinner } from '../../../components/UI'
import { Task } from './task'

export const TasksList = () => {
	const { data: tasks, error, isLoading } = useSWR<GetTask[]>(tasksEndpoint)

	if (error) throw new Error(error.message)
	if (isLoading) return <Spinner />
	if (!tasks?.length) {
		return (
			<h1 className='absolute-center text-xl font-semibold tracking-wide'>
				There are no pending tasks, well done! 💪
			</h1>
		)
	}
	return (
		<div className='flex w-full flex-col gap-4 p-2 sm:flex-row'>
			<List tasks={tasks} getTasksDone={false} />
			<List tasks={tasks} getTasksDone={true} />
		</div>
	)
}

const List = ({ tasks, getTasksDone }: { tasks: GetTask[]; getTasksDone: boolean }) => {
	const filteredTasks = tasks.filter(({ done }) => (getTasksDone ? done : !done))

	return (
		<div className='w-full sm:w-1/2'>
			<h1 className='rounded-md bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-2 text-xl font-semibold shadow-lg drop-shadow-lg'>
				{getTasksDone ? '💪 DONE' : '🏗️ TO DO'}
			</h1>
			{filteredTasks.length !== 0 && (
				<div className='flex flex-col gap-4 p-4'>
					<AnimatePresence>
						{filteredTasks.map((task) => (
							<motion.div layout key={task.id}>
								<Task task={task} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			)}
		</div>
	)
}
