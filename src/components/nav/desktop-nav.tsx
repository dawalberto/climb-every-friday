'use client'

import { interFont } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { HiChevronLeft } from 'react-icons/hi2'
import { PiSignOut } from 'react-icons/pi'

export const DesktopNav = () => {
	const { data: session } = useSession()
	const route = useRouter()

	return (
		<nav className='mx-auto hidden h-16 max-w-7xl items-center justify-between px-4 text-xl sm:flex'>
			<div className='flex items-center gap-5 space-x-9'>
				<Link href={'/'} className={clsx(interFont.className, navItemAnimationStyle)}>
					<GiMountaintop className='h-10 w-10' />
				</Link>
				{generateNavigation({ routes })}
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

const navItemAnimationStyle = ''
// const navItemAnimationStyle = 'transition-transform duration-200 hover:scale-105 active:scale-95'

function generateNavigation({
	routes,
	parentPath = '',
	close,
	closeSubroutes = [],
}: {
	routes: Route[]
	parentPath?: string
	close?: () => void
	closeSubroutes?: (() => void)[]
}) {
	if (close && closeSubroutes) {
		closeSubroutes.push(close)
	}

	const handleOnClick = () => {
		if (close && closeSubroutes) {
			closeSubroutes.forEach((close) => close())
		}
	}

	const Navigation = (
		<div className='cursor-pointer'>
			{routes.map(({ name, path, subRoutes }) => {
				const fullPath = `${parentPath}${path}`

				return (
					<div
						key={path}
						className={clsx(
							interFont.className,
							navItemAnimationStyle,
							'flex items-center justify-between'
						)}
					>
						<Link key={fullPath} href={fullPath} onClick={handleOnClick}>
							{name}
						</Link>

						{subRoutes && (
							<Menu as='div' className='relative'>
								<Menu.Button className='flex items-center'>
									<HiChevronLeft />
								</Menu.Button>
								<Menu.Items className='absolute left-0 mt-1 w-36 rounded-sm border-2 border-amber-600 bg-gradient-to-r from-amber-300 to-amber-500 px-2 py-1 text-left text-base shadow-sm'>
									<Menu.Item as='div'>
										{({ close: closeMenu }) =>
											generateNavigation({
												routes: subRoutes,
												parentPath: fullPath,
												closeSubroutes,
												close: closeMenu,
											})
										}
									</Menu.Item>
								</Menu.Items>
							</Menu>
						)}
					</div>
				)
			})}
		</div>
	)

	return Navigation
}
