type FormState = 'idle' | 'loading' | 'success' | 'error'
type FormDataState = {
	state: FormState
	error?: 'credentials' | 'unknown'
	message?: string
}

type RouteNavigation = {
	name: string
	path: string
	category?: 'location' | 'place' | 'sector' | 'boulder'
	subRoutes?: RouteNavigation[]
}

type PageParams = {
	location: string
	place: string
	sector: string
	boulder: string
}
