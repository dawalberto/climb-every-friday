import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { LogoutButton } from './auth/logout-button'

export const Nav = async () => {
	const session = await getServerSession()

	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/login'>Login</Link>
					</li>
				</ul>
				{session?.user && (
					<>
						<h1>Welcome {session.user.name}</h1>
						<LogoutButton />
					</>
				)}
			</nav>
		</header>
	)
}
