'use client'

import { useGetElementPositionAndSize } from '@/hooks/UI'
import { Route as RouteType } from '@/lib/models/routes'
import {
	CustomEvents,
	dispatchCustomEvent,
	subscribe,
	unsubscribe,
} from '@/lib/utils/custom-events'
import { getRouteGradeColorForSVGDrawing } from '@/lib/utils/routes'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { GiStonePile } from 'react-icons/gi'
import { SvgLineDrawer } from '../UI'

type BoulderOptions = {
	name: Pick<Boulder, 'name'>['name']
	sideAImageHref: Pick<Boulder, 'side_a_image_href'>['side_a_image_href']
	routes: RouteType[]
}

export const Boulder = ({ name, routes, sideAImageHref }: BoulderOptions) => {
	const [showBoulderImage, setShowBoulderImage] = useState(true)
	const [clickedRouteId, setClickedRouteId] = useState<string>()
	const { elementToGetPositionAndSizeRef, positionAndSize } = useGetElementPositionAndSize({
		updateOnScroll: true,
	})

	const handleOnRouteOnEditModeOn = useCallback(() => {
		setShowBoulderImage(false)
	}, [])

	const handleOnRouteOnEditModeOff = useCallback(() => {
		setShowBoulderImage(true)
	}, [])

	const handleOnRouteClick = useCallback(
		(event: Event) => {
			const eventClickedLineId = (event as CustomEvent<string>).detail
			if (eventClickedLineId === clickedRouteId) {
				setClickedRouteId(undefined)
			} else {
				setClickedRouteId(eventClickedLineId)
			}
		},
		[clickedRouteId]
	)

	useEffect(() => {
		subscribe(CustomEvents.ON_ROUTE_MODE_EDIT_ON, handleOnRouteOnEditModeOn)
		subscribe(CustomEvents.ON_ROUTE_MODE_EDIT_OFF, handleOnRouteOnEditModeOff)
		return () => {
			unsubscribe(CustomEvents.ON_ROUTE_MODE_EDIT_ON, handleOnRouteOnEditModeOn)
			unsubscribe(CustomEvents.ON_ROUTE_MODE_EDIT_OFF, handleOnRouteOnEditModeOff)
		}
	}, [handleOnRouteOnEditModeOff, handleOnRouteOnEditModeOn])

	useEffect(() => {
		if (positionAndSize) {
			dispatchCustomEvent(
				CustomEvents.ON_POSITION_AND_SIZE_OF_BOULDER_IMAGE_CALCULATED,
				positionAndSize
			)
		}
	}, [positionAndSize])

	useEffect(() => {
		subscribe(CustomEvents.ON_ROUTE_INFO_CLICK, handleOnRouteClick)
		return () => {
			unsubscribe(CustomEvents.ON_ROUTE_INFO_CLICK, handleOnRouteClick)
		}
	}, [handleOnRouteClick])

	return (
		<>
			<h1 className='flex-center z-20 mb-2 flex space-x-2 bg-amber-50 text-3xl font-semibold tracking-wide text-amber-800'>
				<GiStonePile className='z-10' />
				<span className='z-10'>{name}</span>
			</h1>
			<div
				ref={elementToGetPositionAndSizeRef}
				style={{ position: 'relative' }}
				className={clsx(!showBoulderImage && 'invisible')}
			>
				<Image
					src={`/boulders/${sideAImageHref}`}
					alt='Page not found'
					sizes='100%'
					width={0}
					height={0}
					className='h-auto w-full shadow-lg drop-shadow-lg md:rounded-md'
					priority
				/>

				{routes.map((route, index) => {
					const lineNumber = route.coordinates?.length ? { lineNumber: index + 1 } : {}

					return (
						<SvgLineDrawer
							key={route.id}
							opacity={!clickedRouteId || clickedRouteId === route.id ? 1 : 0.3}
							{...lineNumber}
							coordinates={route.coordinates ?? []}
							colors={getRouteGradeColorForSVGDrawing(route.grade)}
						/>
					)
				})}
			</div>
		</>
	)
}
