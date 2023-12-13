'use client'

import { ReactNode } from 'react'
import { Fetcher, SWRConfig } from 'swr'

export const SWRProvider = ({ children }: { children: ReactNode }) => {
	const config = (() => {
		const refreshInterval = 3000
		const fetcher: Fetcher = (resource: string) => fetch(resource).then((res) => res.json())
		const onError = (error: Error) => {
			console.log('🦊 error', error)
		}
		return { refreshInterval, fetcher, onError }
	})()

	return <SWRConfig value={config}>{children}</SWRConfig>
}
