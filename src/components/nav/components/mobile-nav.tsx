import { routes } from '@/lib/routes'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GiMountainClimbing, GiMountaintop } from 'react-icons/gi'
import { useNavigation } from '../hooks/use-navigation'
import { navItemAnimationStyle } from '../styles'

export const MobileNav = () => {
	const [showMenu, setShowMenu] = useState(false)
	const route = useRouter()

	const handleOnNavItemClick = (path: string) => {
		setShowMenu(false)
		route.push(path)
	}
	const { generateNavigation } = useNavigation({ navigationType: 'mobile', handleOnNavItemClick })
	const navigation = generateNavigation({ routes })

	const toggleMenu = () => {
		setShowMenu(!showMenu)
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
			<AnimatePresence>{showMenu && navigation}</AnimatePresence>
			<Link href='/' className={clsx(navItemAnimationStyle, 'z-40')}>
				<GiMountaintop className='h-10 w-10' />
			</Link>
			<Link href='/user' className={clsx(navItemAnimationStyle, 'z-40')}>
				<GiMountainClimbing className='h-10 w-10' />
			</Link>
		</nav>
	)
}
