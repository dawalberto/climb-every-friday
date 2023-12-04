/* eslint-disable @typescript-eslint/no-var-requires */
const { db } = require('@vercel/postgres')

async function seedUsers(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "users" table if it doesn't exist
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email TEXT NOT NULL UNIQUE,
			role VARCHAR(255) NOT NULL DEFAULT 'user',
			password TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
		`
		console.log(`🦍 ✅ - Created "users" table`)

		return {
			createTable,
		}
	} catch (error) {
		console.error('Error seeding users:', error)
		throw error
	}
}

async function seedLocations(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "locations" table if it doesn't exist
		await client.sql`
        CREATE TABLE IF NOT EXISTS locations (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
			identifier_name TEXT NOT NULL UNIQUE, 
			location_link TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
      	`
		console.log(`🦍 ✅ - Created "locations" table`)

		const { rowCount } =
			await client.sql`SELECT * FROM locations WHERE identifier_name = 'villena'`
		if (rowCount === 0) {
			const { rowCount: locationFound } =
				await client.sql`SELECT 1 FROM locations WHERE identifier_name = 'villena'`
			if (locationFound) {
				console.log(`🦍 ❌ - Location 'Villena' already exists`)
				return
			}

			await client.sql`
				INSERT INTO locations (name, identifier_name, location_link) 
				VALUES ('Villena', 'villena', 'https://maps.app.goo.gl/P47ZNkffrhhSAtfWA')
			`
			console.log(`🦍 ✅ - Location 'Villena' created`)
		}
	} catch (error) {
		console.error('Error seeding locations:', error)
		throw error
	}
}

async function seedPlaces(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "places" table if it doesn't exist
		await client.sql`
        CREATE TABLE IF NOT EXISTS places (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
			identifier_name TEXT NOT NULL UNIQUE,
			image_href TEXT NOT NULL UNIQUE,
			location_link TEXT NOT NULL UNIQUE,
            location_id UUID NOT NULL REFERENCES locations(id),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
      	`
		console.log(`🦍 ✅ - Created "places" table`)

		const { rows } =
			await client.sql`SELECT id FROM locations WHERE identifier_name = 'villena'`
		if (rows?.length) {
			const { id } = rows[0]
			const { rowCount: placeFound } =
				await client.sql`SELECT 1 FROM places WHERE identifier_name = 'penia-rubia' AND location_id = ${id} `
			if (placeFound) {
				console.log(`🦍 ❌ - Place 'Peña Rubia' already exists in location 'Villena'`)
				return
			}

			await client.sql`
				INSERT INTO places (name, identifier_name, image_href, location_link, location_id)
				VALUES ('Peña rubia', 'penia-rubia', '/places/penia-rubia.png', 'https://maps.app.goo.gl/U42GjN9ey67hx4fm6', ${id})
			`
			console.log(`🦍 ✅ - Place "Peña Rubia" created in location 'Villena'`)
		}
	} catch (error) {
		console.error('Error seeding places:', error)
		throw error
	}
}

async function seedSectors(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "sectors" table if it doesn't exist
		await client.sql`
        CREATE TABLE IF NOT EXISTS sectors (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
			identifier_name TEXT NOT NULL UNIQUE,
			image_href TEXT UNIQUE,
			place_image_coordinate_x INTEGER,
			place_image_coordinate_y INTEGER,
            place_id UUID NOT NULL REFERENCES places(id),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
      	`
		console.log(`🦍 ✅ - Created "sectors" table`)

		const { rows } =
			await client.sql`SELECT id FROM places WHERE identifier_name = 'penia-rubia'`
		if (rows?.length) {
			const { id } = rows[0]
			const { rowCount: sectorFound } =
				await client.sql`SELECT 1 FROM sectors WHERE identifier_name = 'competition-down' AND place_id = ${id}`
			if (sectorFound) {
				console.log(`🦍 ❌ - Sector 'Competición Down' already exists in place 'Villena'`)
				return
			}

			await client.sql`
				INSERT INTO sectors (name, identifier_name, image_href, place_image_coordinate_x, place_image_coordinate_y, place_id)
				VALUES ('Competición Down', 'competition-down', '/sectors/competition-down.png', 100, 100, ${id})
			`
			console.log(`🦍 ✅ - Sector "Competición Down" created in place 'Villena'`)
		}
	} catch (error) {
		console.error('Error seeding sectors:', error)
		throw error
	}
}

async function seedBoulders(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "boulders" table if it doesn't exist
		await client.sql`
        CREATE TABLE IF NOT EXISTS boulders (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
			identifier_name TEXT NOT NULL UNIQUE,
			image_href TEXT NOT NULL UNIQUE,
			sector_image_coordinate_x INTEGER,
			sector_image_coordinate_y INTEGER,
            sector_id UUID NOT NULL REFERENCES sectors(id),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
      	`
		console.log(`🦍 ✅ - Created "boulders" table`)

		const { rows } =
			await client.sql`SELECT id FROM sectors WHERE identifier_name = 'competition-down'`
		if (rows?.length) {
			const { id } = rows[0]
			const { rowCount: boulderFound } =
				await client.sql`SELECT 1 FROM boulders WHERE identifier_name = 'tiburon' AND sector_id = ${id}`
			if (boulderFound) {
				console.log(`🦍 ❌ - Boulder 'Tiburón' already exists in sector 'Competición Down'`)
				return
			}

			await client.sql`
				INSERT INTO boulders (name, identifier_name, image_href, sector_image_coordinate_x, sector_image_coordinate_y, sector_id)
				VALUES ('Tiburón', 'tiburon', '/boulders/tiburon.png', 100, 100, ${id})
			`
			console.log(`🦍 ✅ - Boulder "Tiburón" created in sector 'Peña rubia'`)
		}
	} catch (error) {
		console.error('Error seeding boulders:', error)
		throw error
	}
}

async function seedRoutes(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "routes" table if it doesn't exist
		await client.sql`
        CREATE TABLE IF NOT EXISTS routes (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
			identifier_name TEXT NOT NULL UNIQUE,
            grade VARCHAR(4) NOT NULL,
			star BOOLEAN NOT NULL DEFAULT false,
            boulder_id UUID NOT NULL REFERENCES boulders(id),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
      	`
		console.log(`🦍 ✅ - Created "routes" table`)

		const { rows } = await client.sql`SELECT id FROM boulders WHERE identifier_name = 'tiburon'`
		if (rows?.length) {
			const { id } = rows[0]
			const { rowCount: routeFound } =
				await client.sql`SELECT 1 FROM routes WHERE identifier_name = 'calipso' AND boulder_id = ${id}`
			if (routeFound) {
				console.log(`🦍 ❌ - Route 'Calipso' already exists in boulder 'Tiburón'`)
				return
			}

			await client.sql`
				INSERT INTO routes (name, identifier_name, grade, star, boulder_id)
				VALUES ('Calipso', 'calipso', '5+', true, ${id})
			`
			console.log(`🦍 ✅ - Route "Calipso" created in boulder 'Tiburón'`)
		}
	} catch (error) {
		console.error('Error seeding routes:', error)
		throw error
	}
}

async function seedImprovements(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
		// Create the "improvements" table if it doesn't exist
		const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS improvements (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN NOT NULL DEFAULT false,
            priority INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            created_by UUID NOT NULL REFERENCES users(id),
            done_at TIMESTAMP
		);
      	`
		console.log(`🦍 ✅ - Created "improvements" table`)

		return {
			createTable,
		}
	} catch (error) {
		console.error('Error seeding improvements:', error)
		throw error
	}
}

async function seed() {
	const client = await db.connect()

	await seedUsers(client)
	await seedLocations(client)
	await seedPlaces(client)
	await seedSectors(client)
	await seedBoulders(client)
	await seedRoutes(client)
	await seedImprovements(client)

	await client.end()
}

seed().catch((err) => {
	console.error('An error occurred while attempting to seed the database:', err)
})
