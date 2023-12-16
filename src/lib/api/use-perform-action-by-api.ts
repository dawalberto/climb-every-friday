'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const usePerformActionByApi = (endpoint: string) => {
	const [actionRunning, setActionRunning] = useState(false)

	const performAction = async ({
		action,
		successMessage,
		errorMessage,
		toastOnSuccess = true,
		toastOnError = true,
	}: {
		action: () => Promise<Response>
		successMessage: string
		errorMessage: string
		toastOnSuccess?: boolean
		toastOnError?: boolean
	}) => {
		setActionRunning(true)
		try {
			const response = await action()
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			mutate(endpoint)
			if (toastOnSuccess) {
				toast.success(successMessage)
			}
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
