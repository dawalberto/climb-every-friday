'use client'

import { Route } from '@/lib/models/routes'
import { usePerformActionByServer } from '@/lib/utils/use-perform-action-by-server'
import { usePathname } from 'next/navigation'
import { updateRoute as updateRouteDB } from '..'

export const useRoutesActions = () => {
	const { performAction, actionRunning } = usePerformActionByServer<Route>()
	const path = usePathname()

	const updateRoute = (route: Route) => {
		performAction({
			action: () => updateRouteDB({ route, pathToRevalidateAndRedirectAfterAction: path }),
			successMessage: 'Route updated successfully',
			errorMessage: 'Error updating route',
		})
	}

	return {
		actionRunning,
		updateRoute,
	}
}
