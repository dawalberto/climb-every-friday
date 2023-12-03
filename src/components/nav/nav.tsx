'use client'

import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'

export const Nav = () => {
	return (
		<header className='bg-gradient-to-r from-amber-300 to-amber-500 shadow-md'>
			<DesktopNav />
			<MobileNav />
		</header>
	)
}
