'use client'

import { PositionAndSize } from '@/hooks/UI/use-get-element-position-and-size'
import { useUserRole } from '@/hooks/domain'
import { Route, RouteSide } from '@/lib/models/routes'
import { CustomEvents, subscribe, unsubscribe } from '@/lib/utils/custom-events'
import { useCallback, useEffect, useState } from 'react'
import { Route as RouteComponent } from './route'

export const Routes = ({ routes }: { routes: Route[] }) => {
	const { userIsAdmin } = useUserRole()
	const [positionAndWidthOfBoulderImage, setPositionAndWidthOfBoulderImage] = useState<
		Pick<PositionAndSize, 'top' | 'left' | 'width'>
	>({ top: 0, left: 0, width: 0 })

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

	return (
		<div className='mt-4 flex-col space-y-3'>
			{routes
				.filter((route) => route.side === RouteSide.A)
				.map((route) => (
					<RouteComponent
						key={route.id}
						route={route}
						userCanEdit={userIsAdmin}
						positionAndWidthOfBoulderImage={positionAndWidthOfBoulderImage}
					/>
				))}
		</div>
	)
}
