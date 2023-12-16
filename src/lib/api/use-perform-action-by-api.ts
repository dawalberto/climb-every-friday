'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const usePerformActionByApi = (endpoint: string) => {
	const [actionRunning, setActionRunning] = useState(false)

	const performAction = async (
		action: () => Promise<Response>,
		successMessage: string,
		errorMessage: string
	) => {
		setActionRunning(true)
		try {
			const response = await action()
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			mutate(endpoint)
			toast.success(successMessage)
		} catch (error) {
			toast.error(errorMessage)
		} finally {
			setActionRunning(false)
		}
	}

	return { actionRunning, performAction }
}
