'use client'

import { menuRoutes } from '@/utils/constants'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'

export const Nav = () => {
	const { data: session } = useSession()

	return (
		<header className='bg-gradient-to-r from-amber-300 to-amber-500'>
			<nav className='mx-auto hidden h-16 max-w-7xl items-center justify-between text-lg sm:flex'>
				<div className='flex items-center gap-5 space-x-9'>
					{menuRoutes.map(({ name, path }) => (
						<Link key={path} href={path} className='hover:scale-105'>
							{path === '/' ? <GiMountaintop className='h-10 w-10' /> : name}
						</Link>
					))}
				</div>
				{session?.user && (
					<div>
						{/* <h1>Welcome {session.user.name}</h1> */}
						<GiMountainClimbing className='h-10 w-10' />
						{/* <LogoutButton /> */}
					</div>
				)}
			</nav>
		</header>
	)
}
