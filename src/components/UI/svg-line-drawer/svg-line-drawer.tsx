import { Position } from '@/hooks/UI'

export const SvgLineDrawer = ({
	coordinates,
	colors = {
		circleColor: '#D97706',
		lineColor: '#F59E0B',
	},
	lineNumber,
}: {
	coordinates: Position[]
	colors?: {
		circleColor?: string
		lineColor?: string
	}
	lineNumber?: number
}) => {
	const lineNumberElement =
		lineNumber && coordinates.length ? (
			<div
				className='absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl font-semibold text-white'
				style={{
					position: 'absolute',
					left: `${coordinates[0].x}%`,
					top: `${coordinates[0].y}%`,
					backgroundColor: colors.circleColor,
				}}
			>
				{lineNumber}
			</div>
		) : null

	return (
		<>
			<svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
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
			{lineNumberElement}
		</>
	)
}
