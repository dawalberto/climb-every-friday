'use client'

import { DesktopNav } from './components/desktop-nav'
import { MobileNav } from './components/mobile-nav'

export const Nav = () => {
	return (
		<header className='fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-md'>
			<DesktopNav />
			<MobileNav />
		</header>
	)
}
