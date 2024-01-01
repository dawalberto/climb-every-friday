import { NotFound } from '@/components'
import { getBoulderByIdentifierName, getRoutesByBoulderId } from '@/services'
import { Boulder } from './components/boulder'

export default async function BoulderPage({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	const { name, id } = boulder || {}
	const routes = await getRoutesByBoulderId(id)

	return (
		<div className='flex flex-col gap-2'>
			<Boulder id={id} name={name} routes={routes} />
			{/* ROUTES */}
		</div>
	)
}
