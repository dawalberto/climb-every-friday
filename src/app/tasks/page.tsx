import { CreateTask } from './components/create-task'
import { TasksList } from './components/tasks-list'

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
