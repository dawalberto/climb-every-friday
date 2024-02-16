import { Position } from '@/hooks/UI'

export type Route = {
	id: string
	name: string
	identifier_name: string
	grade: Grades
	star: boolean
	crossing: boolean
	sit: boolean
	side: RouteSide
	boulder_id: string
	created_at: Date
	coordinates?: Position[]
}

export enum RouteSide {
	A = 'a',
	B = 'b',
	C = 'c',
	D = 'd',
}

export enum Grades {
	'1a',
	'1a+',
	'1b',
	'1b+',
	'1c',
	'1c+',
	'2a',
	'2a+',
	'2b',
	'2b+',
	'2c',
	'2c+',
	'3a',
	'3a+',
	'3b',
	'3b+',
	'3c',
	'3c+',
	'4a',
	'4a+',
	'4b',
	'4b+',
	'4c',
	'4c+',
	'5a',
	'5a+',
	'5b',
	'5b+',
	'5c',
	'5c+',
	'6a',
	'6a+',
	'6b',
	'6b+',
	'6c',
	'6c+',
	'7a',
	'7a+',
	'7b',
	'7b+',
	'7c',
	'7c+',
	'8a',
	'8a+',
	'8b',
	'8b+',
	'8c',
	'8c+',
	'9a',
	'9a+',
	'9b',
	'9b+',
	'9c',
}
