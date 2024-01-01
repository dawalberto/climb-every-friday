export type Route = {
	id: string
	name: string
	identifier_name: string
	grade: string
	star: boolean
	crossing: boolean
	sit: boolean
	side: RouteSide
	boulder_id: string
	created_at: Date
}

export enum RouteSide {
	A = 'a',
	B = 'b',
	C = 'c',
	D = 'd',
}
