'use client'

import { Route as RouteType } from '@/lib/models/routes'
import { useRoutesActions } from '@/services'
import { useRoutesStore } from '@/stores'
import clsx from 'clsx'
import _isEqual from 'lodash/isEqual'
import { useCallback, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa6'
import { GiMountaintop } from 'react-icons/gi'
import { HiPencilSquare } from 'react-icons/hi2'
import { PiBezierCurveBold } from 'react-icons/pi'
import { TbArmchair, TbRoute2 } from 'react-icons/tb'
import { Button } from '../UI'

type EditingRoute = { id?: string; inEditMode: false } | { id: string; inEditMode: true }
export const Route = ({
	route,
	editingRoute,
	setEditingRoute,
	userCanEdit,
}: {
	route: RouteType
	editingRoute: EditingRoute
	setEditingRoute: (editing: EditingRoute) => void
	userCanEdit: boolean
}) => {
	const { actionRunning, updateRoute } = useRoutesActions()
	const { routeCoordinates } = useRoutesStore()
	const [updatedRoute, setUpdatedRoute] = useState<RouteType>(route)

	const isInEditMode = useMemo(
		() => editingRoute.inEditMode && editingRoute.id === route.id,
		[editingRoute, route]
	)

	const handleOnClickEditButton = useCallback(() => {
		if (isInEditMode) {
			setEditingRoute({ inEditMode: false })
		} else {
			setEditingRoute({ id: route.id, inEditMode: true })
		}

		if (routeCoordinates?.routeId === route.id) {
			console.log('🦊 routeCoordinates', routeCoordinates)
			console.log('🦊 updatedRoute', updatedRoute)
		}

		return

		const routeUpdated = _isEqual(route, updatedRoute)

		if (isInEditMode && !routeUpdated) {
			updateRoute(updatedRoute)
		}
	}, [isInEditMode, route, setEditingRoute, updateRoute, updatedRoute, routeCoordinates])

	const handleOnChangeRouteName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRoute((route) => ({ ...route, name: event.target.value }))
	}

	const handleOnChangeRouteGrade = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedRoute((route) => ({ ...route, grade: event.target.value }))
	}

	const handleOnChangeRouteSit = () => {
		setUpdatedRoute((route) => ({ ...route, sit: !route.sit }))
	}

	const handleOnChangeRouteStar = () => {
		setUpdatedRoute((route) => ({ ...route, star: !route.star }))
	}

	const handleOnChangeRouteCrossing = () => {
		setUpdatedRoute((route) => ({ ...route, crossing: !route.crossing }))
	}

	const buttonEditContent = useMemo(() => {
		let icon = <HiPencilSquare className='size-6' />

		if (actionRunning) {
			icon = <GiMountaintop className='size-6 animate-spin' />
		} else {
			if (isInEditMode) {
				icon = <FaRegSave className='size-6' />
			} else {
				icon = <HiPencilSquare className='size-6' />
			}
		}

		return icon
	}, [actionRunning, isInEditMode])

	return (
		<div className='flex items-center gap-2 text-2xl'>
			<TbRoute2 className='-scale-x-[1]' />
			{isInEditMode ? (
				<>
					<input
						type='text'
						className='border-0 border-b-2 border-amber-300 bg-transparent text-2xl focus:border-amber-600 focus:ring-0'
						value={updatedRoute.name}
						onChange={handleOnChangeRouteName}
						placeholder='Route name'
					/>
					<input
						type='text'
						className='max-w-24 border-0 border-b-2 border-amber-300 bg-transparent text-2xl focus:border-amber-600 focus:ring-0'
						value={updatedRoute.grade}
						onChange={handleOnChangeRouteGrade}
						placeholder='Route grade'
					/>
					<TbArmchair
						onClick={handleOnChangeRouteSit}
						className={clsx(
							'cursor-pointer transition-all duration-300',
							updatedRoute.sit ? 'text-amber-500' : 'opacity-40'
						)}
					/>
					<FaRegStar
						onClick={handleOnChangeRouteStar}
						className={clsx(
							'cursor-pointer transition-all duration-300',
							updatedRoute.star ? 'text-amber-500' : 'opacity-40'
						)}
					/>
					<PiBezierCurveBold
						onClick={handleOnChangeRouteCrossing}
						className={clsx(
							'cursor-pointer transition-all duration-300',
							updatedRoute.crossing ? 'text-amber-500' : 'opacity-40'
						)}
					/>
				</>
			) : (
				<>
					<span>{route.name}</span>
					<span className='font-semibold'>{route.grade}</span>
					{route.sit && <TbArmchair title='Sit' />}
					{route.star && <FaRegStar title='Star' />}
					{route.crossing && (
						<PiBezierCurveBold title='Crossing (trave)' className='rotate-180' />
					)}
				</>
			)}
			{userCanEdit && (
				<Button
					buttonStyle={isInEditMode ? 'success' : 'primary'}
					title='Edit route'
					className='size-9 text-yellow-950 shadow-md'
					onClick={handleOnClickEditButton}
					disabled={actionRunning}
				>
					{buttonEditContent}
				</Button>
			)}
		</div>
	)
}
