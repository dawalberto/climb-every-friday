'use client'

import { useElementClickPositions } from '@/hooks/UI'
import { PositionAndSize } from '@/hooks/UI/use-get-element-position-and-size'
import { Route as RouteType } from '@/lib/models/routes'
import { CustomEvents, dispatchCustomEvent } from '@/lib/utils/custom-events'
import { getRouteGradeColorForSVGDrawing } from '@/lib/utils/routes'
import { useRoutesActions } from '@/services'
import clsx from 'clsx'
import _isEqual from 'lodash/isEqual'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa6'
import { GiMountaintop } from 'react-icons/gi'
import { HiOutlineInformationCircle, HiPencilSquare, HiXMark } from 'react-icons/hi2'
import { LuEraser } from 'react-icons/lu'
import { PiBezierCurveBold } from 'react-icons/pi'
import { TbArmchair, TbRoute2 } from 'react-icons/tb'
import { Button, SvgLineDrawer } from '../UI'

export const Route = ({
	route,
	userCanEdit,
	positionAndWidthOfBoulderImage,
}: {
	route: RouteType
	userCanEdit: boolean
	positionAndWidthOfBoulderImage: Pick<PositionAndSize, 'top' | 'left' | 'width'>
}) => {
	const [editMode, setEditMode] = useState(false)
	const { actionRunning, updateRoute } = useRoutesActions()
	const { elementRef, handleClick } = useElementClickPositions<HTMLDivElement>()
	const [updatedRoute, setUpdatedRoute] = useState<RouteType>(route)

	const [showHelpMessageInBoulderImage, setShowHelpMessageInBoulderImage] = useState(true)

	const handleOnClickEditButton = useCallback(() => {
		if (editMode) {
			dispatchCustomEvent(CustomEvents.ON_ROUTE_MODE_EDIT_OFF)
		} else {
			dispatchCustomEvent(CustomEvents.ON_ROUTE_MODE_EDIT_ON)
			setShowHelpMessageInBoulderImage(true)
		}

		setEditMode((mode) => !mode)

		const routeIsNotUpdated = _isEqual(route, updatedRoute)

		if (editMode && !routeIsNotUpdated) {
			updateRoute(updatedRoute)
		}
	}, [editMode, route, updateRoute, updatedRoute])

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

	const handleOnChangeRouteCoordinates = useCallback(
		(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			if (!editMode) {
				return
			}
			const positionClicked = handleClick(event)
			if (!positionClicked) {
				return
			}
			setUpdatedRoute((route) => ({
				...route,
				coordinates: [...(route.coordinates ?? []), positionClicked],
			}))
		},
		[editMode, handleClick]
	)

	const buttonEditContent = useMemo(() => {
		let icon = <HiPencilSquare className='size-6' />

		if (actionRunning) {
			icon = <GiMountaintop className='size-6 animate-spin' />
		} else {
			if (editMode) {
				icon = <FaRegSave className='size-6' />
			} else {
				icon = <HiPencilSquare className='size-6' />
			}
		}

		return icon
	}, [actionRunning, editMode])

	return (
		<>
			{editMode && (
				<div
					className='fixed z-20'
					style={{
						left: positionAndWidthOfBoulderImage.left,
						top: positionAndWidthOfBoulderImage.top - 11,
						width: positionAndWidthOfBoulderImage.width,
					}}
				>
					<div
						ref={elementRef}
						onClick={handleOnChangeRouteCoordinates}
						style={{ position: 'relative' }}
					>
						<Image
							src={`/boulders/tiburon.webp`}
							alt='Page not found'
							sizes='100%'
							width={0}
							height={0}
							className='h-auto w-full shadow-lg drop-shadow-lg md:rounded-md'
							priority
						/>

						<SvgLineDrawer
							coordinates={updatedRoute.coordinates ?? []}
							colors={getRouteGradeColorForSVGDrawing(updatedRoute.grade)}
						/>

						<div className='absolute bottom-2 left-2 z-10 flex flex-col gap-2'>
							<Button
								buttonStyle='danger'
								title='Clear route'
								className='size-9 text-yellow-950 shadow-md hover:text-white'
								onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
									event.stopPropagation()
									setUpdatedRoute((route) => ({ ...route, coordinates: [] }))
								}}
							>
								<LuEraser />
							</Button>
						</div>
						{showHelpMessageInBoulderImage && (
							<div className='absolute right-2 top-2 ml-2 flex flex-col gap-2 rounded-md bg-amber-100 p-2 text-base shadow-md'>
								<div className='flex items-center justify-between'>
									<HiOutlineInformationCircle className='mr-2 size-6' />
									<HiXMark
										className='size-6 cursor-pointer'
										onClick={(e: Event) => {
											e.stopPropagation()
											setShowHelpMessageInBoulderImage(false)
										}}
									/>
								</div>
								<div className='inline'>
									<span className='inline pr-1'>
										Click anywhere on the picture to begin or continue the
										route. Once you complete it click the
									</span>
									<FaRegSave className='inline size-5' />
									<span className='pl-1'>button</span>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
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
						{buttonEditContent}
					</Button>
				)}
			</div>
		</>
	)
}
