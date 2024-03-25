'use client'

import { PositionAndSize } from '@/hooks/UI/use-get-element-position-and-size'
import { useUserRole } from '@/hooks/domain'
import { Route as RouteType } from '@/lib/models/routes'
import { CustomEvents, subscribe, unsubscribe } from '@/lib/utils/custom-events'
import { useCallback, useEffect, useState } from 'react'
import { Route } from './route'

export const Routes = ({ routes }: { routes: RouteType[] }) => {
	const { userIsAdmin } = useUserRole()
	const [positionAndWidthOfBoulderImage, setPositionAndWidthOfBoulderImage] = useState<
		Pick<PositionAndSize, 'top' | 'left' | 'width'>
	>({ top: 0, left: 0, width: 0 })
	const [clickedRouteId, setClickedRouteId] = useState<string>()

	const handleOnPositionAndSizeOfBoulderImageCalculated = useCallback((event: Event) => {
		const positionAndSize = (event as CustomEvent<PositionAndSize>).detail
		setPositionAndWidthOfBoulderImage({
			top: positionAndSize.top,
			left: positionAndSize.left,
			width: positionAndSize.width,
		})
	}, [])

	useEffect(() => {
		subscribe(
			CustomEvents.ON_POSITION_AND_SIZE_OF_BOULDER_IMAGE_CALCULATED,
			handleOnPositionAndSizeOfBoulderImageCalculated
		)
		return () => {
			unsubscribe(
				CustomEvents.ON_POSITION_AND_SIZE_OF_BOULDER_IMAGE_CALCULATED,
				handleOnPositionAndSizeOfBoulderImageCalculated
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		subscribe(CustomEvents.ON_ROUTE_INFO_CLICK, handleOnRouteClick)
		return () => {
			unsubscribe(CustomEvents.ON_ROUTE_INFO_CLICK, handleOnRouteClick)
		}
	}, [handleOnRouteClick])

	return (
		<div className='mt-4 flex-col space-y-3'>
			{routes.map((route, index) => (
				<Route
					key={route.id}
					opacity={!clickedRouteId || clickedRouteId === route.id ? 1 : 0.3}
					route={route}
					index={index}
					userCanEdit={userIsAdmin}
					positionAndWidthOfBoulderImage={positionAndWidthOfBoulderImage}
				/>
			))}
		</div>
	)
}
