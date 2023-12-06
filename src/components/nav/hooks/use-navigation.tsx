import { interFont } from '@/lib/constants'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi2'
import { navAnimationVariants, navItemAnimationStyle } from '../styles'

export const useNavigation = ({
	navigationType,
	handleOnNavItemClick,
}: {
	navigationType: 'desktop' | 'mobile'
	handleOnNavItemClick?: (path: string) => void
}) => {
	const generateDesktopNavigation = ({
		routes,
		parentPath = '',
		close,
		closeSubroutes = [],
	}: {
		routes: Route[]
		parentPath?: string
		close?: () => void
		closeSubroutes?: (() => void)[]
	}) => {
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
								'flex items-center justify-between px-2 py-1'
							)}
						>
							<Link
								key={fullPath}
								href={fullPath}
								onClick={handleOnClick}
								className={clsx(navItemAnimationStyle, 'mr-1 whitespace-nowrap')}
							>
								{name}
							</Link>

							<AnimatePresence>
								{subRoutes && (
									<Menu as='div' className='relative'>
										{({ open }) => (
											<>
												<Menu.Button className='flex items-center'>
													<AnimatePresence mode='wait'>
														<motion.div
															key={open ? 'down' : 'right'}
															initial={{ rotate: 0 }}
															animate={{ rotate: open ? 0 : -90 }}
															exit={{ rotate: 0 }}
														>
															<HiChevronDown className='h-4 w-4' />
														</motion.div>
													</AnimatePresence>
												</Menu.Button>

												<Menu.Items className='absolute -left-9 mt-3 w-fit text-left text-base'>
													<motion.div
														initial={navAnimationVariants.closed}
														animate={navAnimationVariants.open}
														exit={navAnimationVariants.closed}
														transition={{ duration: 0.2 }}
													>
														<Menu.Item
															as='div'
															className='rounded-sm bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg'
														>
															{({ close: closeMenu }) =>
																generateDesktopNavigation({
																	routes: subRoutes,
																	parentPath: fullPath,
																	closeSubroutes,
																	close: closeMenu,
																})
															}
														</Menu.Item>
													</motion.div>
												</Menu.Items>
											</>
										)}
									</Menu>
								)}
							</AnimatePresence>
						</div>
					)
				})}
			</div>
		)

		return Navigation
	}

	const generateMobileNavigation = ({
		routes,
		parentPath = '',
	}: {
		routes: Route[]
		parentPath?: string
	}) => {
		const Navigation = (
			<motion.div
				initial={navAnimationVariants.closed}
				animate={navAnimationVariants.open}
				exit={navAnimationVariants.closed}
				transition={{ duration: 0.2 }}
				className='fixed left-0 top-16 z-30 h-screen w-full bg-gradient-to-r from-amber-300 to-amber-500'
			>
				{routes.map(({ name, path, subRoutes }) => {
					const fullPath = `${parentPath}${path}`

					return (
						<div key={fullPath} className='flex-center relative flex'>
							<button
								key={fullPath}
								onClick={() =>
									handleOnNavItemClick && handleOnNavItemClick(fullPath)
								}
								className={clsx(
									interFont.className,
									navItemAnimationStyle,
									'whitespace-nowrap text-3xl font-bold tracking-wide'
								)}
							>
								{name}
							</button>

							<AnimatePresence>
								{subRoutes && (
									<Menu as='div'>
										{({ open }) => (
											<>
												<Menu.Button className='flex items-center'>
													<AnimatePresence mode='wait'>
														<motion.div
															key={open ? 'down' : 'right'}
															initial={{ rotate: 0 }}
															animate={{ rotate: open ? 0 : -90 }}
															exit={{ rotate: 0 }}
														>
															<HiChevronDown className='h-7 w-7' />
														</motion.div>
													</AnimatePresence>
												</Menu.Button>

												<Menu.Items className='absolute left-1/2 w-fit'>
													<AnimatePresence>
														<motion.div
															initial={{ opacity: 0, y: -150 }}
															animate={{ opacity: 1, y: 0 }}
															exit={{ opacity: 0, y: -150 }}
															transition={{ duration: 0.2 }}
														>
															<Menu.Item as='div'>
																{generateMobileNavigation({
																	routes: subRoutes,
																	parentPath: fullPath,
																})}
															</Menu.Item>
														</motion.div>
													</AnimatePresence>
												</Menu.Items>
											</>
										)}
									</Menu>
								)}
							</AnimatePresence>
						</div>
					)
				})}
			</motion.div>
		)

		return Navigation
	}

	const generateNavigation =
		navigationType === 'desktop' ? generateDesktopNavigation : generateMobileNavigation

	return { generateNavigation }
}
