import { NotFound } from '@/components'
import { getBoulderByIdentifierName } from '@/services'

export default async function Boulders({ params }: { params: { boulder: string } }) {
	const boulderToFind = params.boulder
	const boulder = await getBoulderByIdentifierName(boulderToFind)

	if (!boulder) {
		return <NotFound message={`Boulder ${boulderToFind} not found`} />
	}

	return <div>Boulders</div>
}
