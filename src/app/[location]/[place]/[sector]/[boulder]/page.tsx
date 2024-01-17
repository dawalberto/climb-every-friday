import { NotFound } from '@/components/UI'
import { Boulder } from '@/components/domain'
import { getBoulderByIdentifierName, getRoutesByBoulderId } from '@/services'
import { RoutesProvider } from '@/stores'

export default async function BoulderPage({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	const { name, id, side_a_image_href } = boulder || {}
	const routes = await getRoutesByBoulderId(id)

	return (
		<div className='flex flex-col gap-2'>
			<RoutesProvider>
				<Boulder name={name} sideAImageHref={side_a_image_href} routes={routes} />
			</RoutesProvider>
			{/* ROUTES */}
		</div>
	)
}
