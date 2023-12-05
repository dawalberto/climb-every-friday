import { interFont } from '@/lib/constants'
import { routes } from '@/lib/routes'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { navAnimationVariants } from './styles'

export const MobileNav = () => {
	const [showMenu, setShowMenu] = useState(false)
	const route = useRouter()

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const handleOnNavItemClick = (path: string) => {
		setShowMenu(false)
		route.push(path)
	}

	return (
		<nav className='flex h-16 items-center justify-between px-4 sm:hidden'>
			<motion.button
				onClick={toggleMenu}
				animate={{ rotate: showMenu ? 180 : 0 }}
				transition={{ duration: 0.3 }}
				className='z-40'
			>
				<svg
					className='h-7 w-7'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M4 6h16M4 12h16M4 18h16'
					/>
				</svg>
			</motion.button>
			<AnimatePresence>
				{showMenu && (
					<motion.div
						initial={navAnimationVariants.closed}
						animate={navAnimationVariants.open}
						exit={navAnimationVariants.closed}
						transition={{ duration: 0.2 }}
						className='fixed left-0 top-16 z-30 h-screen w-full bg-gradient-to-r from-amber-300 to-amber-500'
					>
						<motion.div
							initial={navAnimationVariants.closed}
							animate={navAnimationVariants.open}
							exit={navAnimationVariants.closed}
							transition={{ duration: 0.2, delay: 0.2 }}
							className='-mt-16 flex h-full flex-col items-center justify-center space-y-5'
						>
							{routes.map(({ name, path }) => (
								<button
									key={path}
									onClick={() => handleOnNavItemClick(path)}
									className={clsx(
										interFont.className,
										navItemAnimationStyle,
										'text-4xl font-bold'
									)}
								>
									{path === '/' ? null : name}
								</button>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<Link href='/' className={clsx(navItemAnimationStyle, 'z-40')}>
				<GiMountaintop className='h-10 w-10' />
			</Link>
			<Link href='/user' className={clsx(navItemAnimationStyle, 'z-40')}>
				<GiMountainClimbing className='h-10 w-10' />
			</Link>
		</nav>
	)
}

const navItemAnimationStyle = 'transition-transform duration-200 active:scale-95'
