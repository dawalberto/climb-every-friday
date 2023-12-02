'use client'

import { menuRoutes } from '@/utils/constants'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { LogoutButton } from './auth/logout-button'

export const Nav = () => {
	const { data: session } = useSession()

	return (
		<header className='bg-gradient-to-r from-amber-300 to-amber-500'>
			<nav className='mx-auto hidden h-16 max-w-7xl items-center justify-between sm:flex'>
				<div className='flex gap-5 space-x-9'>
					{menuRoutes.map(({ name, path }) => (
						<Link key={path} href={path}>
							{name}
						</Link>
					))}
				</div>
				<Link href={'/login'}>login</Link>
				{session?.user && (
					<div>
						<h1>Welcome {session.user.name}</h1>
						<LogoutButton />
					</div>
				)}
			</nav>
		</header>
	)
}
