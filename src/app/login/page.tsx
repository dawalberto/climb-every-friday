import LoginForm from '@/components/auth/login-form'
import { User } from '@/types/common'
import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const getUsers = async () => await sql<User>`SELECT * FROM users;`
export default async function Login() {
	const session = await getServerSession()
	if (session) {
		redirect('/')
	}

	const { rows: users } = await getUsers()

	return (
		<div className='fixed left-1/2 top-1/3 flex w-full -translate-x-1/2 -translate-y-1/3 flex-col gap-4 rounded-sm px-2 py-4 sm:w-3/5 sm:border-2 sm:border-amber-400 sm:px-6 sm:shadow-md  md:w-2/4 lg:w-1/2 xl:w-1/4'>
			<h1 className='text-center text-2xl'>Welcome climber 🦊</h1>
			<LoginForm users={users} />
		</div>
	)
}
