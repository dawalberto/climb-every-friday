'use client'

import { Route as RouteType } from '@/lib/models/routes'
import { getRouteGradeColorForSVGDrawing } from '@/lib/utils/routes'
import Image from 'next/image'
import { GiStonePile } from 'react-icons/gi'
import { SvgLineDrawer } from '../UI'

type BoulderOptions = {
	name: Pick<Boulder, 'name'>['name']
	sideAImageHref: Pick<Boulder, 'side_a_image_href'>['side_a_image_href']
	routes: RouteType[]
}

export const Boulder = ({ name, routes, sideAImageHref }: BoulderOptions) => {
	return (
		<>
			<h1 className='flex-center flex space-x-2 text-3xl font-semibold tracking-wide text-amber-800'>
				<GiStonePile />
				<span>{name}</span>
			</h1>
			<div style={{ position: 'relative' }}>
				<Image
					src={`/boulders/${sideAImageHref}`}
					alt='Page not found'
					sizes='100%'
					width={0}
					height={0}
					className='h-auto w-full shadow-lg drop-shadow-lg md:rounded-md'
					priority
				/>

				{routes.map((route) => (
					<SvgLineDrawer
						key={route.id}
						coordinates={route.coordinates ?? []}
						colors={getRouteGradeColorForSVGDrawing(route.grade)}
					/>
				))}
			</div>
		</>
	)
}
