'use client'

import { useCallback, useRef } from 'react'

export const useElementClickPositions = <T extends HTMLElement>() => {
	const elementRef = useRef<T>(null)

	const handleClick = useCallback(
		(event: React.MouseEvent<T, globalThis.MouseEvent>): Position | undefined => {
			if (!elementRef.current) return

			const rect = elementRef.current.getBoundingClientRect()
			const x = Number((((event.clientX - rect.left) / rect.width) * 100).toFixed(3))
			const y = Number((((event.clientY - rect.top) / rect.height) * 100).toFixed(3))

			return { x, y }
		},
		[]
	)

	return { elementRef, handleClick }
}

export type Position = { x: number; y: number }
