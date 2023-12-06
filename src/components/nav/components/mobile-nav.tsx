import { routes } from '@/lib/routes'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { useNavigation } from '../hooks/use-navigation'
import { navAnimationVariants, navItemAnimationStyle } from '../styles'

export const MobileNav = () => {
	const [showMenu, setShowMenu] = useState(false)
	const route = useRouter()

	const handleOnNavItemClick = (path: string) => {
		setShowMenu(false)
		route.push(path)
	}
	const { generateNavigation } = useNavigation({
		navigationType: 'mobile',
		handleOnNavItemClick,
	})
	const navigation = generateNavigation({ routes })

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	return (
		<>
			<nav
				className={clsx(
					!showMenu && 'shadow-md',
					'fixed left-0 z-50 flex h-16 w-full items-center justify-between bg-gradient-to-r from-amber-300 to-amber-500 px-4 sm:hidden'
				)}
			>
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
				<Link href='/' className={clsx(navItemAnimationStyle, 'z-40')}>
					<GiMountaintop className='h-10 w-10' />
				</Link>
				<Link href='/user' className={clsx(navItemAnimationStyle, 'z-40')}>
					<GiMountainClimbing className='h-10 w-10' />
				</Link>
			</nav>
			<AnimatePresence>
				{showMenu && (
					<motion.div
						initial={navAnimationVariants.closed}
						animate={navAnimationVariants.open}
						exit={navAnimationVariants.closed}
						transition={{ duration: 0.2 }}
						className='heigh-mobile-menu fixed left-0 top-16 z-30 flex w-full flex-col items-center gap-7 overflow-y-scroll bg-gradient-to-r from-amber-300 to-amber-500 pt-6'
					>
						{navigation}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
