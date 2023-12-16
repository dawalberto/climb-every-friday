import { CreateTask, TasksList } from '@/components'

export default function Page() {
	return (
		<>
			<CreateTask />
			<div className='mt-4'>
				<TasksList />
			</div>
		</>
	)
}
