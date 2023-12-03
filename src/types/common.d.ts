export type User = {
	id: string
	name: string
	email: string
	role: string
	password?: string
}

export type FormState = 'idle' | 'loading' | 'success' | 'error'
export type FormDataState = {
	state: FormState
	error?: 'credentials' | 'unknown'
	message?: string
}
