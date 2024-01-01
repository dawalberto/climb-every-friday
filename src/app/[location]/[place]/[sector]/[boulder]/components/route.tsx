'use client'

import { Button } from '@/components'
import { Route as RouteType } from '@/lib/models/routes'
import { FaRegStar } from 'react-icons/fa6'
import { HiPencilSquare } from 'react-icons/hi2'
import { TbArmchair, TbRoute2 } from 'react-icons/tb'

export const Route = ({ route }: { route: RouteType }) => {
	const { name, grade, sit, star } = route

	return (
		<div className='flex items-center gap-2 text-2xl'>
			<TbRoute2 />
			<span>{name}</span>
			<span className='font-semibold'>{grade}</span>
			{sit && (
				<span>
					<TbArmchair />
				</span>
			)}
			{star && (
				<span>
					<FaRegStar />
				</span>
			)}
			<Button buttonStyle='primary' title='Edit route'>
				<HiPencilSquare className='size-6' />
			</Button>
		</div>
	)
}
