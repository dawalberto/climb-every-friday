type Task = {
	id: string
	name: string
	description?: string
	done?: boolean
	priority?: number
	created_at?: string
	created_by?: string
	done_at?: string
	updated_by?: string
}

type GetTask = Task & { created_by_name: Pick<User, 'name'>['name'] }
