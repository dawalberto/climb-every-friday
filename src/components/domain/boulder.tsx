'use client'

import { Position, useElementClickPositions } from '@/hooks/UI'
import { useRoute } from '@/hooks/domain'
import { RouteSide, Route as RouteType } from '@/lib/models/routes'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { GiStonePile } from 'react-icons/gi'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LuEraser } from 'react-icons/lu'
import { Button } from '../UI'

type BoulderOptions = {
	name: Pick<Boulder, 'name'>['name']
	routes: RouteType[]
}

export const Boulder = ({ name, routes }: BoulderOptions) => {
	const { elementRef, handleClick } = useElementClickPositions<HTMLDivElement>()
	const [routesCoordinates, setRoutesCoordinates] = useState<Position[]>([])
	const { RouteComponent: Route, editingRoute } = useRoute()

	const handleClickWithPositions = useCallback(
		(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			console.log('🦊 editingRoute', editingRoute)
			if (!editingRoute.inEditMode) {
				return
			}
			const positionClicked = handleClick(event)
			if (positionClicked) {
				setRoutesCoordinates((prevPositions) => [...prevPositions, positionClicked])
			}
		},
		[editingRoute, handleClick]
	)

	return (
		<>
			<h1 className='flex-center flex space-x-2 text-3xl font-semibold tracking-wide text-amber-800'>
				<GiStonePile />
				<span>{name}</span>
			</h1>
			<div
				ref={elementRef}
				onClick={handleClickWithPositions}
				style={{ position: 'relative' }}
			>
				<Image
					src='/tmp/tiburon.webp'
					alt='Page not found'
					sizes='100%'
					width={0}
					height={0}
					className='h-auto w-full rounded-md shadow-lg drop-shadow-lg'
					priority
				/>
				<svg
					style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
				>
					{routesCoordinates.length > 0 &&
						routesCoordinates.map((position, index) => {
							return (
								<circle
									key={index}
									cx={`${position.x}%`}
									cy={`${position.y}%`}
									r='6'
									fill='#D97706'
								/>
							)
						})}
					{routesCoordinates.length >= 2 &&
						routesCoordinates.map((position, index) => {
							if (index < routesCoordinates.length - 1) {
								return (
									<line
										key={index}
										x1={`${position.x}%`}
										y1={`${position.y}%`}
										x2={`${routesCoordinates[index + 1].x}%`}
										y2={`${routesCoordinates[index + 1].y}%`}
										stroke='#F59E0B'
										strokeWidth={4}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								)
							}
							return null
						})}
				</svg>
				{editingRoute.inEditMode && (
					<div className='absolute bottom-2 left-2 z-10 flex flex-col gap-2'>
						<Button
							buttonStyle='danger'
							title='Clear route'
							className='size-9 text-yellow-950 shadow-md hover:text-white'
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								event.stopPropagation()
								console.log('🦊 routesCoordinates', routesCoordinates)
								setRoutesCoordinates([])
							}}
							// disabled={actionRunning}
						>
							<LuEraser />
						</Button>
					</div>
				)}
			</div>
			{editingRoute.inEditMode && (
				<div className='flex flex-wrap items-center justify-start gap-2 rounded-sm bg-amber-100 p-2 text-base'>
					<HiOutlineInformationCircle className='mr-2 size-6' />
					<span>
						Click anywhere on the picture to begin the route. Once you complete it click
						the
					</span>
					<FaRegSave className='size-5' />
					<span>button</span>
				</div>
			)}
			<div className='mt-4 flex-col space-y-3'>
				{routes
					.filter((route) => route.side === RouteSide.A)
					.map((route) => (
						<Route key={route.id} route={route} />
					))}
			</div>
		</>
	)
}
