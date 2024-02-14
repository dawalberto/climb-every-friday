'use client'

import { FormErrors, useElementClickPositions, useForm } from '@/hooks/UI'
import { PositionAndSize } from '@/hooks/UI/use-get-element-position-and-size'
import { Grades, Route as RouteType } from '@/lib/models/routes'
import { CustomEvents, dispatchCustomEvent } from '@/lib/utils/custom-events'
import { getRouteGradeColor, getRouteGradeColorForSVGDrawing } from '@/lib/utils/routes'
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
import { Button, Option, Select, SvgLineDrawer, transformEnumToSelectOptions } from '../UI'

// TODO - create RouteEdit and RouteDetails component instead of doing it in the template itself

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

	const validateRoute = (formData: Partial<RouteType>) => {
		// TODO - Route update validations
		const formErrors: FormErrors<RouteType> = {}

		if (!formData.name) {
			formErrors.name = 'The name is required'
		}

		return formErrors
	}

	const {
		formData: updatedRoute,
		handleInputChange,
		handleInputToggle,
		setValueOfFieldManually,
	} = useForm<RouteType>(route, validateRoute)

	const [showHelpMessageInBoulderImage, setShowHelpMessageInBoulderImage] = useState(true)

	const gradesOptions = useMemo(() => transformEnumToSelectOptions(Grades), [])

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

	const handleOnChangeRouteGrade = (routeSelected: Option) => {
		setValueOfFieldManually({ grade: routeSelected.id as unknown as Grades })
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
			setValueOfFieldManually({
				coordinates: [...(updatedRoute.coordinates ?? []), positionClicked],
			})
		},
		[editMode, handleClick, setValueOfFieldManually, updatedRoute]
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

	const colorIconRoute = useMemo(() => {
		const color = getRouteGradeColor(updatedRoute.grade)

		if (color?.length) {
			return color[1]
		}
		return 'black'
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateRoute])

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
									setValueOfFieldManually({ ...route, coordinates: [] })
								}}
							>
								<LuEraser />
							</Button>
						</div>
						{showHelpMessageInBoulderImage && (
							<div className='absolute right-2 top-2 ml-2 flex flex-col gap-2 rounded-md bg-amber-100 p-2 text-base shadow-md'>
								<div className='flex items-center justify-between'>
									<HiOutlineInformationCircle className='size-6 text-transparent' />
									<HiOutlineInformationCircle className='mr-2 size-6' />
									<HiXMark
										className='size-6 cursor-pointer'
										onClick={(e: React.MouseEvent) => {
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
			<div className='flex items-center justify-between gap-2 text-2xl'>
				<div className='flex items-center gap-2'>
					{editMode ? (
						<>
							<TbRoute2 className='-scale-x-[1]' />
							<input
								name='name'
								type='text'
								className='max-w-40 border-0 border-b-2 border-amber-300 bg-transparent text-2xl focus:border-amber-600 focus:ring-0 md:max-w-48'
								value={updatedRoute.name}
								onChange={handleInputChange}
								placeholder='Route name'
							/>
							<div className='max-w-20 md:max-w-32'>
								<Select
									options={gradesOptions}
									defaultValue={
										{
											id: updatedRoute.grade,
											name: updatedRoute.grade,
										} as unknown as Option
									}
									onChange={handleOnChangeRouteGrade}
								/>
							</div>
							<TbArmchair
								onClick={() => handleInputToggle('sit')}
								className={clsx(
									'cursor-pointer transition-all duration-300',
									updatedRoute.sit ? 'text-amber-500' : 'opacity-40'
								)}
							/>
							<FaRegStar
								onClick={() => handleInputToggle('star')}
								className={clsx(
									'cursor-pointer transition-all duration-300',
									updatedRoute.star ? 'text-amber-500' : 'opacity-40'
								)}
							/>
							<PiBezierCurveBold
								onClick={() => handleInputToggle('crossing')}
								className={clsx(
									'cursor-pointer transition-all duration-300',
									updatedRoute.crossing ? 'text-amber-500' : 'opacity-40'
								)}
							/>
						</>
					) : (
						<>
							<div className='flex items-center gap-2'>
								<TbRoute2
									className='-scale-x-[1]'
									style={{
										color: colorIconRoute,
									}}
								/>
								<span>{route.name}</span>
								<span className='font-semibold'>{route.grade}</span>
								{route.sit && <TbArmchair title='Sit' />}
								{route.star && <FaRegStar title='Star' />}
								{route.crossing && (
									<PiBezierCurveBold
										title='Crossing (trave)'
										className='rotate-180'
									/>
								)}
							</div>
						</>
					)}
				</div>
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
