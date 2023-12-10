'use client'

import { Button } from '@/components'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'

const postTask = async ({ taskName, userId }: { taskName: string; userId: string }) => {
	const response = await fetch('http://localhost:3000/api/tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ taskName, userId }),
	})
	console.log('🦊 response', response)
}

export default function Page() {
	const { data } = useSession()
	const { user } = data ?? {}
	const [taskName, setTaskName] = useState<Pick<Task, 'name'>['name']>('')

	return (
		<div>
			<div className='flex flex-col'>
				<div className='flex flex-col sm:flex-row'>
					<input
						type='text'
						placeholder='Task'
						className='rounded-sm text-xl focus:border-amber-400 focus:ring-amber-400 sm:w-[90%]'
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
					<Button
						buttonStyle='primary'
						className='flex-1'
						onClick={() => postTask({ taskName, userId: (user as User).id ?? '' })}
						// onClick={() => insertTask((user as User).id ?? '', taskName)}
					>
						<>
							<HiOutlinePlus />
							<span>Create</span>
						</>
					</Button>
				</div>
			</div>
		</div>
	)
}
