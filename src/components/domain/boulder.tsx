'use client'

import { Position, useElementClickPositions } from '@/hooks/UI'
import { useRoute } from '@/hooks/domain'
import { RouteSide, Route as RouteType } from '@/lib/models/routes'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { GiStonePile } from 'react-icons/gi'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LuEraser } from 'react-icons/lu'
import { Button, SvgLineDrawer } from '../UI'

type BoulderOptions = {
	name: Pick<Boulder, 'name'>['name']
	routes: RouteType[]
}

export const Boulder = ({ name, routes }: BoulderOptions) => {
	const { elementRef, handleClick } = useElementClickPositions<HTMLDivElement>()
	const [routesCoordinates, setRoutesCoordinates] = useState<
		{ routeId: string; coordinates: Position[] }[]
	>([])
	const { RouteComponent: Route, editingRoute, getRouteGradeColor } = useRoute()

	const handleClickWithPositions = useCallback(
		(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			if (!editingRoute.inEditMode) {
				return
			}
			const positionClicked = handleClick(event)
			if (positionClicked) {
				setRoutesCoordinates((prevPositions) => {
					const routeId = editingRoute.id
					const routeCoordinates = prevPositions.find(
						(route) => route.routeId === routeId
					)
					if (routeCoordinates) {
						routeCoordinates.coordinates.push(positionClicked)
						return [...prevPositions]
					}
					return [...prevPositions, { routeId, coordinates: [positionClicked] }]
				})
			}
		},
		[editingRoute, handleClick]
	)

	const editingRouteCoordinates = useMemo(
		() =>
			routesCoordinates.find((route) => route.routeId === editingRoute.id)?.coordinates ?? [],
		[editingRoute, routesCoordinates]
	)

	const eraseRouteCoordinates = useCallback((routeId: string) => {
		setRoutesCoordinates((prevPositions) => {
			const routeCoordinates = prevPositions.find((route) => route.routeId === routeId)
			if (routeCoordinates) {
				routeCoordinates.coordinates = []
				return [...prevPositions]
			}
			return prevPositions
		})
	}, [])

	const routeGradeColors = useCallback(
		(routeId: Pick<RouteType, 'id'>['id']) => {
			const route = routes.find((route) => route.id === routeId)
			if (route) {
				const colors = getRouteGradeColor(route.grade)
				if (colors) {
					return {
						circleColor: colors[0],
						lineColor: colors[1],
					}
				}
			}

			return undefined
		},
		[getRouteGradeColor, routes]
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

				{editingRoute.inEditMode ? (
					<SvgLineDrawer
						coordinates={editingRouteCoordinates}
						colors={routeGradeColors(editingRoute.id)}
					/>
				) : (
					routesCoordinates.map(({ routeId, coordinates }) => (
						<SvgLineDrawer
							key={routeId}
							coordinates={coordinates}
							colors={routeGradeColors(routeId)}
						/>
					))
				)}

				{editingRoute.inEditMode && (
					<div className='absolute bottom-2 left-2 z-10 flex flex-col gap-2'>
						<Button
							buttonStyle='danger'
							title='Clear route'
							className='size-9 text-yellow-950 shadow-md hover:text-white'
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								event.stopPropagation()
								eraseRouteCoordinates(editingRoute.id)
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
