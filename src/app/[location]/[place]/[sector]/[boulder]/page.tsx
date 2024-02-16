import { NotFound } from '@/components/UI'
import { Boulder, Routes } from '@/components/domain'
import { getBoulderByIdentifierName, getRoutesByBoulderId } from '@/services'

export default async function BoulderPage({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	const { name, id, side_a_image_href } = boulder || {}
	const routes = await getRoutesByBoulderId(id)

	return (
		<div className='relative flex flex-col gap-2'>
			<Boulder name={name} sideAImageHref={side_a_image_href} routes={routes} />
			<Routes routes={routes} />
		</div>
	)
}
