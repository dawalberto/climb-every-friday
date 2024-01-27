import { Nav } from '@/components/UI'
import { AuthProvider, SWRProvider } from '@/components/providers'
import { khandFont } from '@/lib/constants'
import { toasterClasses, toasterStyles } from '@/lib/utils/styles'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
	title: 'Climb Every Friday',
	description: 'Visualize and quickly find the routes you want to climb',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={khandFont.className}>
			<AuthProvider>
				<SWRProvider>
					<body className='relative bg-amber-50 text-lg text-amber-950'>
						<Nav />
						<div className='relative mx-auto mt-20 max-w-7xl px-1 md:px-4'>
							{children}
						</div>
					</body>
				</SWRProvider>
			</AuthProvider>
			<Toaster
				toastOptions={{
					unstyled: true,
					classNames: toasterClasses,
					style: toasterStyles,
				}}
			/>
		</html>
	)
}
