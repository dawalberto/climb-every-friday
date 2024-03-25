import { getBouldersBySectorId, getSectorByIdentifierName } from '@/services'

export default async function Sectors({ params }: { params: PageParams }) {
	const sector = await getSectorByIdentifierName(params.sector)
	console.log('🦊 sector', sector)

	if (!sector) {
		console.log(`🐛 sector with identifier_name "${params.sector}" not found`)
		return <h1>Ups! It seems like the details about this sector are missing 🤷‍♂️</h1>
	}

	const sectorBoulders = await getBouldersBySectorId(sector.id)

	console.log('🦊 sectorBoulders', sectorBoulders)

	return <div>Sector</div>
}
