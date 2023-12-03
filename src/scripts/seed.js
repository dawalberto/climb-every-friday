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
			password TEXT NOT NULL
		);
		`

		console.log(`Created "users" table`)

		return {
			createTable,
		}
	} catch (error) {
		console.error('Error seeding users:', error)
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

		console.log(`Created "improvements" table`)

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
	await seedImprovements(client)

	await client.end()
}

seed().catch((err) => {
	console.error('An error occurred while attempting to seed the database:', err)
})
