'use client'

import { CreateTask } from '@/components'
import { getTasksByApi } from '@/services/tasks/api'
import { useEffect, useState } from 'react'

export default function Page() {
	const [tasks, setTasks] = useState<Task[]>()
	const [reFetch, setReFetch] = useState(false)

	useEffect(() => {
		getTasksByApi()
			.then((tasksResponse) => {
				setTasks(tasksResponse)
			})
			.catch((error) => console.log('🦊 error', error))
	}, [reFetch])

	return (
		<>
			<CreateTask onCreateTask={() => setReFetch((fetchState) => !fetchState)} />
			{!tasks && <p>Loading...</p>}
			{tasks && (
				<pre>
					<code>{JSON.stringify(tasks, null, 4)}</code>
				</pre>
			)}
		</>
	)
}
