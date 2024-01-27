'use client'

import { useGetElementPositionAndSize } from '@/hooks/UI/use-get-element-position-and-size'
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
	const { elementToGetPositionAndSizeRef, positionAndSize } = useGetElementPositionAndSize({
		updateOnScroll: false,
	})

	const handleOnRouteOnEditModeOn = useCallback(() => {
		setShowBoulderImage(false)
	}, [])

	const handleOnRouteOnEditModeOff = useCallback(() => {
		setShowBoulderImage(true)
	}, [])

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

	return (
		<>
			{/* Just for hide the routes on scroll */}
			<div className='fixed left-0 top-0 h-40 w-full bg-amber-50 ' />

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

				{routes.map((route) => (
					<SvgLineDrawer
						key={route.id}
						coordinates={route.coordinates ?? []}
						colors={getRouteGradeColorForSVGDrawing(route.grade)}
					/>
				))}
			</div>
		</>
	)
}
