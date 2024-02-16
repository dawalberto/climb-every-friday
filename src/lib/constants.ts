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
		grade: Grades['1a'],
		colors: ['#60a5fa', '#3b82f6'],
	},
	{
		grade: Grades['1a+'],
		colors: ['#3b82f6', '#2563eb'],
	},
	{
		grade: Grades['1b'],
		colors: ['#2563eb', '#1d4ed8'],
	},
	{
		grade: Grades['1b+'],
		colors: ['#1d4ed8', '#1e40af'],
	},
	{
		grade: Grades['1c'],
		colors: ['#1e40af', '#1e3a8a'],
	},
	{
		grade: Grades['1c+'],
		colors: ['#1e3a8a', '#172554'],
	},
	{
		grade: Grades['2a'],
		colors: ['#2dd4bf', '#14b8a6'],
	},
	{
		grade: Grades['2a+'],
		colors: ['#14b8a6', '#0d9488'],
	},
	{
		grade: Grades['2b'],
		colors: ['#0d9488', '#0f766e'],
	},
	{
		grade: Grades['2b+'],
		colors: ['#0f766e', '#115e59'],
	},
	{
		grade: Grades['2c'],
		colors: ['#115e59', '#134e4a'],
	},
	{
		grade: Grades['2c+'],
		colors: ['#134e4a', '#042f2e'],
	},
	{
		grade: Grades['3a'],
		colors: ['#34d399', '#10b981'],
	},
	{
		grade: Grades['3a+'],
		colors: ['#10b981', '#059669'],
	},
	{
		grade: Grades['3b'],
		colors: ['#059669', '#047857'],
	},
	{
		grade: Grades['3b+'],
		colors: ['#047857', '#065f46'],
	},
	{
		grade: Grades['3c'],
		colors: ['#065f46', '#064e3b'],
	},
	{
		grade: Grades['3c+'],
		colors: ['#064e3b', '#022c22'],
	},
	{
		grade: Grades['4a'],
		colors: ['#4ade80', '#22c55e'],
	},
	{
		grade: Grades['4a+'],
		colors: ['#22c55e', '#16a34a'],
	},
	{
		grade: Grades['4b'],
		colors: ['#16a34a', '#15803d'],
	},
	{
		grade: Grades['4b+'],
		colors: ['#15803d', '#166534'],
	},
	{
		grade: Grades['4c'],
		colors: ['#166534', '#14532d'],
	},
	{
		grade: Grades['4c+'],
		colors: ['#14532d', '#052e16'],
	},
	{
		grade: Grades['5a'],
		colors: ['#a3e635', '#84cc16'],
	},
	{
		grade: Grades['5a+'],
		colors: ['#84cc16', '#65a30d'],
	},
	{
		grade: Grades['5b'],
		colors: ['#65a30d', '#4d7c0f'],
	},
	{
		grade: Grades['5b+'],
		colors: ['#4d7c0f', '#3f6212'],
	},
	{
		grade: Grades['5c'],
		colors: ['#3f6212', '#365314'],
	},
	{
		grade: Grades['5c+'],
		colors: ['#365314', '#1a2e05'],
	},
	{
		grade: Grades['6a'],
		colors: ['#facc15', '#eab308'],
	},
	{
		grade: Grades['6a+'],
		colors: ['#eab308', '#ca8a04'],
	},
	{
		grade: Grades['6b'],
		colors: ['#ca8a04', '#a16207'],
	},
	{
		grade: Grades['6b+'],
		colors: ['#a16207', '#854d0e'],
	},
	{
		grade: Grades['6c'],
		colors: ['#854d0e', '#713f12'],
	},
	{
		grade: Grades['6c+'],
		colors: ['#713f12', '#422006'],
	},
	{
		grade: Grades['7a'],
		colors: ['#fbbf24', '#f59e0b'],
	},
	{
		grade: Grades['7a+'],
		colors: ['#f59e0b', '#d97706'],
	},
	{
		grade: Grades['7b'],
		colors: ['#d97706', '#b45309'],
	},
	{
		grade: Grades['7b+'],
		colors: ['#b45309', '#92400e'],
	},
	{
		grade: Grades['7c'],
		colors: ['#92400e', '#78350f'],
	},
	{
		grade: Grades['7c+'],
		colors: ['#78350f', '#451a03'],
	},
	{
		grade: Grades['8a'],
		colors: ['#fb923c', '#f97316'],
	},
	{
		grade: Grades['8a+'],
		colors: ['#f97316', '#ea580c'],
	},
	{
		grade: Grades['8b'],
		colors: ['#ea580c', '#c2410c'],
	},
	{
		grade: Grades['8b+'],
		colors: ['#c2410c', '#9a3412'],
	},
	{
		grade: Grades['8c'],
		colors: ['#9a3412', '#7c2d12'],
	},
	{
		grade: Grades['8c+'],
		colors: ['#7c2d12', '#431407'],
	},
	{
		grade: Grades['9a'],
		colors: ['#f87171', '#ef4444'],
	},
	{
		grade: Grades['9a+'],
		colors: ['#ef4444', '#dc2626'],
	},
	{
		grade: Grades['9b'],
		colors: ['#dc2626', '#b91c1c'],
	},
	{
		grade: Grades['9b+'],
		colors: ['#b91c1c', '#991b1b'],
	},
	{
		grade: Grades['9c'],
		colors: ['#991b1b', '#7f1d1d'],
	},
]
