import { sql } from '@vercel/postgres'

export default async function Login() {
	const { rows } = await sql`SELECT id, name, email FROM users;`
	console.log('💣🚨 rows', rows)
	return (
		<div>
			<h1>Login page</h1>
			<h2>Users:</h2>
			<ul>
				{rows.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</div>
	)
}
