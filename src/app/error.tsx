'use client'

import { Button } from '@/components'
import Image from 'next/image'

export default function Error({
	// error,
	reset,
}: {
	// error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className='absolute-center h-auto w-full sm:w-1/2'>
			<div className='flex-center flex flex-col gap-6'>
				<Image
					src='/internal-server-error-500.svg'
					alt='Internal server error'
					sizes='100%'
					width={0}
					height={0}
					className='h-auto w-full p-2'
					priority
				/>
				<h1 className='text-2xl font-semibold tracking-wide'>
					Sorry, something went wrong =(
				</h1>
				<Button buttonStyle='primary' onClick={reset}>
					<span>Try again</span>
				</Button>
			</div>
		</div>
	)
}
