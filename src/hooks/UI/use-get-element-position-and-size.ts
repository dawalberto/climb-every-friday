'use client'

import { useEffect, useRef, useState } from 'react'

export const useGetElementPositionAndSize = () => {
	const elementRef = useRef<HTMLDivElement>(null)
	const [positionAndSize, setPositionAndSize] = useState({
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 0,
		width: 0,
	})

	const updatePositionAndSize = () => {
		const elementPositionAndSize = elementRef.current?.getBoundingClientRect()
		if (elementPositionAndSize) {
			setPositionAndSize({
				top: elementPositionAndSize.top,
				left: elementPositionAndSize.left,
				bottom: elementPositionAndSize.bottom,
				right: elementPositionAndSize.right,
				height: elementPositionAndSize.height,
				width: elementPositionAndSize.width,
			})
		}
	}

	useEffect(() => {
		updatePositionAndSize()
		window.addEventListener('resize', updatePositionAndSize)
		window.addEventListener('scroll', updatePositionAndSize)

		return () => {
			window.removeEventListener('resize', updatePositionAndSize)
			window.removeEventListener('scroll', updatePositionAndSize)
		}
	}, [])

	return { elementToGetPositionAndSizeRef: elementRef, positionAndSize }
}

export type PositionAndSize = {
	top: number
	left: number
	bottom: number
	right: number
	height: number
	width: number
}
