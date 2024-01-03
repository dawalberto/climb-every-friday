import Image from 'next/image'
import Link from 'next/link'

export const NotFound = ({ message }: { message?: string }) => {
	return (
		<div className='absolute-center h-auto w-full sm:w-1/2'>
			<div className='flex-center flex flex-col gap-6'>
				<Image
					src='/not-found-404.svg'
					alt='Page not found'
					sizes='100%'
					width={0}
					height={0}
					className='h-auto w-full p-2'
					priority
				/>
				<h1 className='text-2xl font-semibold tracking-wide'>
					{message ? message : 'Page not found'}
				</h1>
				<Link className='text-amber-600 hover:text-amber-700' href='/'>
					Home
				</Link>
			</div>
		</div>
	)
}
