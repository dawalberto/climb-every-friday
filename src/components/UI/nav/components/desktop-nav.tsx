'use client'

import { interFont } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { PiSignOut } from 'react-icons/pi'
import { useNavigation } from '../hooks/use-navigation'
import { navItemAnimationStyle } from '../styles'

export const DesktopNav = () => {
	const { data: session } = useSession()
	const route = useRouter()
	const { generateNavigation } = useNavigation({ navigationType: 'desktop' })

	return (
		<nav className='mx-auto hidden h-16 max-w-7xl items-center justify-between space-x-4 px-4 text-lg font-semibold tracking-wide md:!flex'>
			<Link
				href={'/'}
				className={clsx(interFont.className, navItemAnimationStyle, 'flex-none')}
			>
				<GiMountaintop className='h-10 w-10' />
			</Link>
			<div className='flex-1 flex-row items-center gap-5 space-x-9'>
				{generateNavigation({ routes })}
			</div>
			{session?.user && (
				<Menu as='div' className='relative z-50'>
					<Menu.Button>
						<GiMountainClimbing className='h-10 w-10' />
					</Menu.Button>
					<Menu.Items className='absolute right-0 mt-0.5 divide-y-2 divide-amber-500 whitespace-nowrap rounded-md bg-gradient-to-r from-amber-300 to-amber-500 py-1 text-left text-base shadow-sm'>
						<Menu.Item as='div'>
							<button
								onClick={() => route.push('/user')}
								className={clsx(
									interFont.className,
									navItemAnimationStyle,
									'flex items-center space-x-2 px-4 py-1'
								)}
							>
								<span>🦍</span>
								<span>{session.user.name}</span>
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								onClick={() => signOut()}
								className={clsx(interFont.className, '')}
							>
								<span
									className={clsx(
										navItemAnimationStyle,
										'flex items-center space-x-2 px-4 py-1'
									)}
								>
									<PiSignOut className='h-5 w-5' />
									<span>Sign out</span>
								</span>
							</button>
						</Menu.Item>
					</Menu.Items>
				</Menu>
			)}
		</nav>
	)
}
