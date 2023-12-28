'use client'

import { Position, useElementClickPositions } from '@/hooks'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { GiStonePile } from 'react-icons/gi'

export const Boulder = ({ boulder }: { boulder: Boulder }) => {
	const { elementRef, handleClick } = useElementClickPositions<HTMLDivElement>()
	const [positions, setPositions] = useState<Position[]>([])

	const { name, id } = boulder || {}

	const handleClickWithPositions = useCallback(
		(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			const positionClicked = handleClick(event)
			const position = positionClicked && { x: positionClicked.x, y: positionClicked.y }
			if (position) {
				setPositions((prevPositions) => [...prevPositions, position])
			}
		},
		[handleClick]
	)

	return (
		<>
			<h1>{id}</h1>
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
					className='h-auto w-full'
					priority
				/>
				<svg
					style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
				>
					{positions.length >= 2 &&
						positions.map((position, index) => {
							if (index < positions.length - 1) {
								return (
									<line
										key={index}
										x1={`${position.x}%`}
										y1={`${position.y}%`}
										x2={`${positions[index + 1].x}%`}
										y2={`${positions[index + 1].y}%`}
										stroke='#F59E0B'
										strokeWidth={4}
									/>
								)
							}
							return null
						})}
				</svg>
			</div>
		</>
	)
}
