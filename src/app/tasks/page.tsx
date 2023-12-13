'use client'

import { CreateTask } from '@/components'
import useSWR from 'swr'

export default function Page() {
	const { data: tasks, error, isLoading } = useSWR('/api/tasks')

	if (error) throw new Error(error.message)
	if (isLoading) return <div>↻ Loading...</div>

	return (
		<>
			<CreateTask />
			{tasks?.length === 0 && <p>No tasks 🤷‍♂️</p>}
			{tasks && (
				<pre>
					<code>{JSON.stringify(tasks, null, 4)}</code>
				</pre>
			)}
		</>
	)
}
