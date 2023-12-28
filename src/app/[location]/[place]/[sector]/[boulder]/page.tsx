import { NotFound } from '@/components'
import { getBoulderByIdentifierName } from '@/services'
import { Boulder } from './components/boulder'

export default async function BoulderPage({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	// TODO - Get boulder's routes
	// TODO - Update boulder's routes with positions
	// TODO - Render svg with routes from ddbb

	return (
		<div className='flex flex-col gap-2'>
			<Boulder boulder={boulder} />
			{/* ROUTES */}
		</div>
	)
}
