type FormState = 'idle' | 'loading' | 'success' | 'error'
type FormDataState = {
	state: FormState
	error?: 'credentials' | 'unknown'
	message?: string
}

type Route = {
	name: string
	path: string
	category?: 'location' | 'place' | 'sector' | 'boulder'
	subRoutes?: Route[]
}
