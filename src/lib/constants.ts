import { Inter, Khand } from 'next/font/google'
import { Grades } from './models/routes'

export const interFont = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export const khandFont = Khand({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '300', '500', '600', '700'],
})

export const gradesWithColors: { grade: Grades; colors: [string, string] }[] = [
	{
		grade: '1a' as unknown as Grades,
		colors: ['#60a5fa', '#3b82f6'],
	},
	{
		grade: '1a+' as unknown as Grades,
		colors: ['#3b82f6', '#2563eb'],
	},
	{
		grade: '1b' as unknown as Grades,
		colors: ['#2563eb', '#1d4ed8'],
	},
	{
		grade: '1b+' as unknown as Grades,
		colors: ['#1d4ed8', '#1e40af'],
	},
	{
		grade: '1c' as unknown as Grades,
		colors: ['#1e40af', '#1e3a8a'],
	},
	{
		grade: '1c+' as unknown as Grades,
		colors: ['#1e3a8a', '#172554'],
	},
	{
		grade: '2a' as unknown as Grades,
		colors: ['#2dd4bf', '#14b8a6'],
	},
	{
		grade: '2a+' as unknown as Grades,
		colors: ['#14b8a6', '#0d9488'],
	},
	{
		grade: '2b' as unknown as Grades,
		colors: ['#0d9488', '#0f766e'],
	},
	{
		grade: '2b+' as unknown as Grades,
		colors: ['#0f766e', '#115e59'],
	},
	{
		grade: '2c' as unknown as Grades,
		colors: ['#115e59', '#134e4a'],
	},
	{
		grade: '2c+' as unknown as Grades,
		colors: ['#134e4a', '#042f2e'],
	},
	{
		grade: '3a' as unknown as Grades,
		colors: ['#34d399', '#10b981'],
	},
	{
		grade: '3a+' as unknown as Grades,
		colors: ['#10b981', '#059669'],
	},
	{
		grade: '3b' as unknown as Grades,
		colors: ['#059669', '#047857'],
	},
	{
		grade: '3b+' as unknown as Grades,
		colors: ['#047857', '#065f46'],
	},
	{
		grade: '3c' as unknown as Grades,
		colors: ['#065f46', '#064e3b'],
	},
	{
		grade: '3c+' as unknown as Grades,
		colors: ['#064e3b', '#022c22'],
	},
	{
		grade: '4a' as unknown as Grades,
		colors: ['#4ade80', '#22c55e'],
	},
	{
		grade: '4a+' as unknown as Grades,
		colors: ['#22c55e', '#16a34a'],
	},
	{
		grade: '4b' as unknown as Grades,
		colors: ['#16a34a', '#15803d'],
	},
	{
		grade: '4b+' as unknown as Grades,
		colors: ['#15803d', '#166534'],
	},
	{
		grade: '4c' as unknown as Grades,
		colors: ['#166534', '#14532d'],
	},
	{
		grade: '4c+' as unknown as Grades,
		colors: ['#14532d', '#052e16'],
	},
	{
		grade: '5a' as unknown as Grades,
		colors: ['#a3e635', '#84cc16'],
	},
	{
		grade: '5a+' as unknown as Grades,
		colors: ['#84cc16', '#65a30d'],
	},
	{
		grade: '5b' as unknown as Grades,
		colors: ['#65a30d', '#4d7c0f'],
	},
	{
		grade: '5b+' as unknown as Grades,
		colors: ['#4d7c0f', '#3f6212'],
	},
	{
		grade: '5c' as unknown as Grades,
		colors: ['#3f6212', '#365314'],
	},
	{
		grade: '5c+' as unknown as Grades,
		colors: ['#365314', '#1a2e05'],
	},
	{
		grade: '6a' as unknown as Grades,
		colors: ['#facc15', '#eab308'],
	},
	{
		grade: '6a+' as unknown as Grades,
		colors: ['#eab308', '#ca8a04'],
	},
	{
		grade: '6b' as unknown as Grades,
		colors: ['#ca8a04', '#a16207'],
	},
	{
		grade: '6b+' as unknown as Grades,
		colors: ['#a16207', '#854d0e'],
	},
	{
		grade: '6c' as unknown as Grades,
		colors: ['#854d0e', '#713f12'],
	},
	{
		grade: '6c+' as unknown as Grades,
		colors: ['#713f12', '#422006'],
	},
	{
		grade: '7a' as unknown as Grades,
		colors: ['#fbbf24', '#f59e0b'],
	},
	{
		grade: '7a+' as unknown as Grades,
		colors: ['#f59e0b', '#d97706'],
	},
	{
		grade: '7b' as unknown as Grades,
		colors: ['#d97706', '#b45309'],
	},
	{
		grade: '7b+' as unknown as Grades,
		colors: ['#b45309', '#92400e'],
	},
	{
		grade: '7c' as unknown as Grades,
		colors: ['#92400e', '#78350f'],
	},
	{
		grade: '7c+' as unknown as Grades,
		colors: ['#78350f', '#451a03'],
	},
	{
		grade: '8a' as unknown as Grades,
		colors: ['#fb923c', '#f97316'],
	},
	{
		grade: '8a+' as unknown as Grades,
		colors: ['#f97316', '#ea580c'],
	},
	{
		grade: '8b' as unknown as Grades,
		colors: ['#ea580c', '#c2410c'],
	},
	{
		grade: '8b+' as unknown as Grades,
		colors: ['#c2410c', '#9a3412'],
	},
	{
		grade: '8c' as unknown as Grades,
		colors: ['#9a3412', '#7c2d12'],
	},
	{
		grade: '8c+' as unknown as Grades,
		colors: ['#7c2d12', '#431407'],
	},
	{
		grade: '9a' as unknown as Grades,
		colors: ['#f87171', '#ef4444'],
	},
	{
		grade: '9a+' as unknown as Grades,
		colors: ['#ef4444', '#dc2626'],
	},
	{
		grade: '9b' as unknown as Grades,
		colors: ['#dc2626', '#b91c1c'],
	},
	{
		grade: '9b+' as unknown as Grades,
		colors: ['#b91c1c', '#991b1b'],
	},
	{
		grade: '9c' as unknown as Grades,
		colors: ['#991b1b', '#7f1d1d'],
	},
]
