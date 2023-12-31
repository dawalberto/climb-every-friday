import { Inter, Khand } from 'next/font/google'

export const interFont = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export const khandFont = Khand({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '300', '500', '600', '700'],
})
