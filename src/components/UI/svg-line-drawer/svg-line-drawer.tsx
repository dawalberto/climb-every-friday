'use client'

import { Position } from '@/hooks/UI'
import { useCallback } from 'react'

export const SvgLineDrawer = ({
	coordinates,
	colors = {
		circleColor: '#D97706',
		lineColor: '#F59E0B',
	},
	lineNumber,
	opacity = 1,
}: {
	coordinates: Position[]
	colors?: {
		circleColor?: string
		lineColor?: string
	}
	lineNumber?: number
	opacity?: number
}) => {
	const lineNumberElement = useCallback(
		(position: 'start' | 'end') => {
			if (!lineNumber || !coordinates.length) {
				return null
			}
			const positionToShow =
				position === 'start' ? coordinates[0] : coordinates[coordinates.length - 1]

			return (
				<div
					className='absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg font-semibold text-white md:size-7 md:text-xl'
					style={{
						position: 'absolute',
						left: `${positionToShow.x}%`,
						top: `${positionToShow.y}%`,
						backgroundColor: colors.circleColor,
						opacity,
					}}
				>
					{lineNumber}
				</div>
			)
		},
		[colors, coordinates, lineNumber, opacity]
	)

	return (
		<>
			<svg
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					opacity: opacity,
				}}
			>
				{coordinates.length > 0 &&
					coordinates.map(({ x, y }, index) => {
						return (
							<circle
								key={index}
								cx={`${x}%`}
								cy={`${y}%`}
								r='6'
								fill={colors.circleColor}
							/>
						)
					})}
				{coordinates.length >= 2 &&
					coordinates.map(({ x, y }, index) => {
						if (index < coordinates.length - 1) {
							return (
								<line
									key={index}
									x1={`${x}%`}
									y1={`${y}%`}
									x2={`${coordinates[index + 1].x}%`}
									y2={`${coordinates[index + 1].y}%`}
									stroke={colors.lineColor}
									strokeWidth={4}
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							)
						}
						return null
					})}
			</svg>
			{lineNumberElement('start')}
			{lineNumberElement('end')}
		</>
	)
}
