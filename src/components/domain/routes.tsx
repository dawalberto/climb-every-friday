'use client'

import { useUserRole } from '@/hooks/domain'
import { Route, RouteSide } from '@/lib/models/routes'
import { Route as RouteComponent } from './route'

export const Routes = ({ routes }: { routes: Route[] }) => {
	const { userIsAdmin } = useUserRole()

	return (
		<div className='mt-4 flex-col space-y-3'>
			{routes
				.filter((route) => route.side === RouteSide.A)
				.map((route) => (
					<RouteComponent key={route.id} route={route} userCanEdit={userIsAdmin} />
				))}
		</div>
	)
}
