'use client'

import { useSession } from 'next-auth/react'

export const useUserRole = () => {
	const { data } = useSession()
	const user = data?.user as User
	const userIsAdmin = user?.role === 'admin'

	return { userIsAdmin }
}
