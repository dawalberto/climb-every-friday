'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const usePerformActionByServer = <T>() => {
	const [actionRunning, setActionRunning] = useState(false)
	const pathname = usePathname()
	const router = useRouter()

	const performAction = async ({
		action,
		successMessage,
		errorMessage,
		toastOnSuccess = true,
		toastOnError = true,
	}: {
		action: () => Promise<T>
		successMessage: string
		errorMessage: string
		toastOnSuccess?: boolean
		toastOnError?: boolean
	}) => {
		setActionRunning(true)
		try {
			await action()
			if (toastOnSuccess) {
				toast.success(successMessage)
			}
			router.push(pathname)
		} catch (error) {
			if (toastOnError) {
				toast.error(errorMessage)
			}
		} finally {
			setActionRunning(false)
		}
	}

	return { actionRunning, performAction }
}
