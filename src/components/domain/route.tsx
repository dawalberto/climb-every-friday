'use client'

import { Button } from '@/components/UI'
import { Route as RouteType } from '@/lib/models/routes'
import { useRoutesActions } from '@/services'
import clsx from 'clsx'
import _isEqual from 'lodash/isEqual'
import { useCallback, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa6'
import { GiMountaintop } from 'react-icons/gi'
import { HiPencilSquare } from 'react-icons/hi2'
import { PiBezierCurveBold } from 'react-icons/pi'
import { TbArmchair, TbRoute2 } from 'react-icons/tb'

export const Route = ({
	route,
	userCanEdit,
	onRouteChangeEditMode,
}: {
	route: RouteType
	userCanEdit: boolean
	onRouteChangeEditMode: (inEditMode: boolean) => void
}) => {
	const [editMode, setEditMode] = useState(false)
	const [updatedRoute, setUpdatedRoute] = useState<RouteType>(route)
	const { actionRunning, updateRoute } = useRoutesActions()

	const handleOnClickEditButton = useCallback(() => {
		setEditMode((edit) => !edit)
		onRouteChangeEditMode(!editMode)
		const routeUpdated = _isEqual(route, updatedRoute)

		if (editMode && !routeUpdated) {
			updateRoute(updatedRoute)
		}
	}, [editMode, onRouteChangeEditMode, route, updateRoute, updatedRoute])

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

	const buttonContent = useMemo(() => {
		if (actionRunning) {
			return <GiMountaintop className='size-6 animate-spin' />
		}
		return editMode ? <FaRegSave className='size-6' /> : <HiPencilSquare className='size-6' />
	}, [editMode, actionRunning])

	return (
		<div className='flex items-center gap-2 text-2xl'>
			<TbRoute2 className='-scale-x-[1]' />
			{editMode ? (
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
					buttonStyle={editMode ? 'success' : 'primary'}
					title='Edit route'
					className='size-9 text-yellow-950 shadow-md'
					onClick={handleOnClickEditButton}
					disabled={actionRunning}
				>
					{buttonContent}
				</Button>
			)}
		</div>
	)
}
