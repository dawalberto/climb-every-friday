'use client'

import { DesktopNav } from './components/desktop-nav'
import { MobileNav } from './components/mobile-nav'

export const Nav = () => {
	return (
		<header className='bg-gradient-to-r from-amber-300 to-amber-500 shadow-md'>
			<DesktopNav />
			<MobileNav />
		</header>
	)
}
