'use client'

import { CreateTask } from '@/components'
import { endpoint as tasksEndpoint } from '@/services/tasks/tasks.endpoints'
import useSWR from 'swr'

export default function Page() {
	const { data: tasks, error, isLoading } = useSWR<Task[]>(tasksEndpoint)

	if (error) throw new Error(error.message)
	if (isLoading) return <div>↻ Loading...</div>

	return (
		<>
			<CreateTask />
			{tasks?.length === 0 && (
				<h1 className='absolute-center text-xl font-semibold tracking-wide'>
					There are no pending tasks, well done! 💪
				</h1>
			)}
			{tasks && tasks.map((task) => <div key={task.id}>{task.name}</div>)}
		</>
	)
}
