'use client'

import { useEffect } from 'react'

export default function SetVh() {
	useEffect(() => {
		if (typeof window === 'undefined') return

		function setVh() {
			const vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}

		setVh()

		window.addEventListener('load', setVh)
		window.addEventListener('resize', setVh)

		return () => {
			window.removeEventListener('load', setVh)
			window.removeEventListener('resize', setVh)
		}
	}, [])

	return null
}
