import { NotFound } from '@/components/UI'
import { Boulder, Routes } from '@/components/domain'
import { RouteSide } from '@/lib/models/routes'
import { getBoulderByIdentifierName, getRoutesByBoulderIdAndSide } from '@/services'

// TODO - chevrons to the left and right of the boulder title to change boulder side

export default async function BoulderPage({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	const { name, id, side_a_image_href } = boulder || {}
	const routes = await getRoutesByBoulderIdAndSide(id, RouteSide.A)

	return (
		<div className='relative flex flex-col gap-2'>
			<Boulder name={name} sideAImageHref={side_a_image_href} routes={routes} />
			<Routes routes={routes} boulderSideAImageHref={side_a_image_href} />
		</div>
	)
}
