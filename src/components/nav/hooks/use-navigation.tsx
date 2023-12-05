import { interFont } from '@/lib/constants'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'
import { navAnimationVariants, navItemAnimationStyle } from '../styles'

export const useNavigation = () => {
	const generateNavigation = ({
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
								className={clsx(navItemAnimationStyle, 'mr-1')}
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
														{open ? (
															<motion.div
																key='down'
																initial={{ rotate: 0 }}
																animate={{ rotate: -90 }}
																exit={{ rotate: 0 }}
															>
																<HiChevronDown />
															</motion.div>
														) : (
															<motion.div
																key='right'
																initial={{ rotate: 0 }}
																animate={{ rotate: 0 }}
																exit={{ rotate: 0 }}
															>
																<HiChevronDown />
															</motion.div>
														)}
													</AnimatePresence>
												</Menu.Button>
												<Menu.Items className='absolute left-7 mt-1 w-36 text-left text-base shadow-lg'>
													<motion.div
														initial={navAnimationVariants.closed}
														animate={navAnimationVariants.open}
														exit={navAnimationVariants.closed}
														transition={{ duration: 0.2 }}
													>
														<Menu.Item
															as='div'
															className='rounded-sm bg-gradient-to-r from-amber-300 to-amber-500'
														>
															{({ close: closeMenu }) =>
																generateNavigation({
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

	return { generateNavigation }
}
