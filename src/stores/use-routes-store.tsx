'use client'

import { RouteCoordinates } from '@/components/domain'
import { FC, ReactNode, createContext, useContext, useState } from 'react'

type Store = {
	routeCoordinates: RouteCoordinates | undefined
	setRouteCoordinates: (routeCoordinates: RouteCoordinates) => void
}

const RoutesContext = createContext<Store | undefined>(undefined)

export const RoutesProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinates | undefined>(
		undefined
	)

	return (
		<RoutesContext.Provider value={{ routeCoordinates, setRouteCoordinates }}>
			{children}
		</RoutesContext.Provider>
	)
}

export const useRoutesStore = (): Store => {
	const context = useContext(RoutesContext)
	if (!context) {
		throw new Error('useRoutesStore must be used within a RoutesProvider')
	}
	return context
}
