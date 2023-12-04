'use client'

import { interFont, menuRoutes } from '@/lib/constants'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { PiSignOut } from 'react-icons/pi'

export const DesktopNav = () => {
	const { data: session } = useSession()
	const route = useRouter()

	return (
		<nav className='mx-auto hidden h-16 max-w-7xl items-center justify-between px-4 text-lg sm:flex'>
			<div className='flex items-center gap-5 space-x-9'>
				{menuRoutes.map(({ name, path }) => (
					<Link
						key={path}
						href={path}
						className={clsx(interFont.className, navItemAnimationStyle)}
					>
						{path === '/' ? <GiMountaintop className='h-10 w-10' /> : name}
					</Link>
				))}
			</div>
			{session?.user && (
				<Menu as='div' className='relative'>
					<Menu.Button>
						<GiMountainClimbing className='h-10 w-10' />
					</Menu.Button>
					<Menu.Items className='absolute right-0 mt-0.5 w-36 rounded-sm border-2 border-amber-600 bg-gradient-to-r from-amber-300 to-amber-500 text-left text-base shadow-sm'>
						<Menu.Item as='div' className='border-b-2 border-amber-600'>
							<button
								onClick={() => route.push('/user')}
								className={clsx(
									interFont.className,
									navItemAnimationStyle,
									'flex items-center space-x-2 px-4 py-2'
								)}
							>
								<span>🦍</span>
								<span>{session.user.name}</span>
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								onClick={() => signOut()}
								className={clsx(
									interFont.className,
									navItemAnimationStyle,
									'flex items-center space-x-2 px-4 py-2'
								)}
							>
								<PiSignOut className='h-5 w-5' />
								<span>Sign out</span>
							</button>
						</Menu.Item>
					</Menu.Items>
				</Menu>
			)}
		</nav>
	)
}

const navItemAnimationStyle = 'transition-transform duration-200 hover:scale-105 active:scale-95'
