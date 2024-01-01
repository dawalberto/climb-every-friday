'use client'

import { Position, useElementClickPositions } from '@/hooks'
import { RouteSide, Route as RouteType } from '@/lib/models/routes'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { GiStonePile } from 'react-icons/gi'
import { Route } from './route'

type BoulderOptions = {
	id: Pick<Boulder, 'id'>['id']
	name: Pick<Boulder, 'name'>['name']
	routes: RouteType[]
}

export const Boulder = ({ id, name, routes }: BoulderOptions) => {
	const { elementRef, handleClick } = useElementClickPositions<HTMLDivElement>()
	const [coordinates, setCoordinates] = useState<Position[]>([])

	const handleClickWithPositions = useCallback(
		(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			const positionClicked = handleClick(event)
			const position = positionClicked && { x: positionClicked.x, y: positionClicked.y }
			if (position) {
				setCoordinates((prevPositions) => [...prevPositions, position])
			}
		},
		[handleClick]
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
					{coordinates.length >= 2 &&
						coordinates.map((position, index) => {
							if (index < coordinates.length - 1) {
								return (
									<line
										key={index}
										x1={`${position.x}%`}
										y1={`${position.y}%`}
										x2={`${coordinates[index + 1].x}%`}
										y2={`${coordinates[index + 1].y}%`}
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
			</div>
			<div className='mt-6 flex-col space-y-3'>
				{routes
					.filter((route) => route.side === RouteSide.A)
					.map((route) => (
						<Route key={route.id} route={route} />
					))}
			</div>
		</>
	)
}
