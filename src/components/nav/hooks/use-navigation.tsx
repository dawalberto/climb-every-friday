import { interFont } from '@/lib/constants'
import { Disclosure, Menu } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { GiStonePile } from 'react-icons/gi'
import { GoMilestone } from 'react-icons/go'
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
		currentIteration = 0,
	}: {
		routes: Route[]
		parentPath?: string
		close?: () => void
		closeSubroutes?: (() => void)[]
		currentIteration?: number
	}) => {
		if (close && closeSubroutes) {
			closeSubroutes.push(close)
		}

		const handleOnNavigate = () => {
			if (close && closeSubroutes) {
				closeSubroutes.forEach((close) => close())
			}
		}

		const handleCloseSubroutes = (e: React.MouseEvent, menuIsOpen: boolean) => {
			if (menuIsOpen && closeSubroutes.length) {
				e.preventDefault()
				closeSubroutes[closeSubroutes.length - 1]()
			}
		}

		const Navigation = (
			<div
				key={parentPath + currentIteration}
				className={clsx(
					'flex',
					currentIteration === 0
						? 'flex-row space-x-4'
						: 'flex-col divide-y-2 divide-amber-500'
				)}
			>
				{routes.map(({ name, path, category, subRoutes }) => {
					const fullPath = `${parentPath}${path}`

					return (
						<React.Fragment key={fullPath}>
							{getCategory(category)}
							<div
								key={path}
								className={clsx(
									interFont.className,
									'flex items-center justify-between px-3 py-1.5'
								)}
							>
								<Link
									key={fullPath}
									href={fullPath}
									onClick={handleOnNavigate}
									className={clsx(navItemAnimationStyle, 'whitespace-nowrap')}
								>
									{name}
								</Link>

								<AnimatePresence>
									{subRoutes && (
										<Menu as='div' className='relative ml-2'>
											{({ open }) => (
												<>
													<Menu.Button
														className='flex items-center'
														onClick={(e) =>
															handleCloseSubroutes(e, open)
														}
													>
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

													<Menu.Items
														className={clsx(
															'absolute -left-7 mt-3 w-fit text-left text-base',
															currentIteration !== 0 && 'z-50'
														)}
													>
														<motion.div
															initial={navAnimationVariants.closed}
															animate={navAnimationVariants.open}
															exit={navAnimationVariants.closed}
															transition={{ duration: 0.2 }}
														>
															<Menu.Item
																as='div'
																className='rounded-sm bg-gradient-to-r from-amber-500 to-amber-300 shadow-lg'
															>
																{({ close: closeMenu }) =>
																	generateDesktopNavigation({
																		routes: subRoutes,
																		parentPath: fullPath,
																		closeSubroutes,
																		close: closeMenu,
																		currentIteration,
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
						</React.Fragment>
					)
				})}
			</div>
		)

		currentIteration++
		return Navigation
	}

	const generateMobileNavigation = ({
		routes,
		parentPath = '',
		currentIteration = 0,
	}: {
		routes: Route[]
		parentPath?: string
		currentIteration?: number
	}) => {
		const Navigation = routes.map(({ name, path, category, subRoutes }) => {
			const fullPath = `${parentPath}${path}`

			return (
				<Disclosure key={fullPath} as='div'>
					{({ open }) => (
						<div>
							<div
								key={fullPath}
								className={clsx(
									interFont.className,
									navItemAnimationStyle,
									'flex items-center whitespace-nowrap font-bold tracking-wide',
									currentIteration <= 1 && 'text-4xl',
									currentIteration === 2 && 'pl-4 text-3xl text-amber-900',
									currentIteration === 3 && 'pl-8 text-2xl text-amber-800',
									currentIteration >= 4 && 'pl-16 text-xl text-amber-700'
								)}
							>
								{getCategory(category)}
								<button
									onClick={() =>
										handleOnNavItemClick && handleOnNavItemClick(fullPath)
									}
								>
									{name}
								</button>
								{subRoutes && (
									<Disclosure.Button className='ml-2'>
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
									</Disclosure.Button>
								)}
							</div>

							<AnimatePresence>
								{subRoutes && (
									<>
										<Disclosure.Panel>
											<AnimatePresence>
												<motion.div
													initial={{
														opacity: 0,
														y: -150,
														x: -150,
													}}
													animate={{ opacity: 1, y: 0, x: 0 }}
													exit={{ opacity: 0, y: -150, x: -150 }}
													transition={{ duration: 0.2 }}
												>
													{generateMobileNavigation({
														routes: subRoutes,
														parentPath: fullPath,
														currentIteration,
													})}
												</motion.div>
											</AnimatePresence>
										</Disclosure.Panel>
									</>
								)}
							</AnimatePresence>
						</div>
					)}
				</Disclosure>
			)
		})

		currentIteration++
		return Navigation
	}

	const getCategory = (category?: Pick<Route, 'category'>['category']) => {
		switch (category) {
			case 'sector':
				if (navigationType === 'desktop') {
					return (
						<div className='flex-center flex space-x-2 px-6 py-1 text-amber-700'>
							<GoMilestone className='h-5 w-5' />
							<h2 className='text-sm capitalize'>{category}</h2>
						</div>
					)
				} else {
					return <GoMilestone className='mr-2 h-6 w-6' />
				}
			case 'boulder':
				if (navigationType === 'desktop') {
					return (
						<div className='flex-center flex space-x-2 px-6 py-1 text-amber-700'>
							<GiStonePile className='h-5 w-5' />
							<h2 className='text-sm capitalize'>{category}</h2>
						</div>
					)
				} else {
					return <GiStonePile className='mr-2 h-6 w-6' />
				}
			default:
				return null
		}
	}

	const generateNavigation =
		navigationType === 'desktop' ? generateDesktopNavigation : generateMobileNavigation

	return { generateNavigation }
}
