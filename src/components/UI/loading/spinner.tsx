import { GiMountaintop } from 'react-icons/gi'

export const Spinner = () => {
	return (
		<div className='absolute-center w-full text-amber-600 md:h-72 md:w-72'>
			<GiMountaintop className='h-auto w-full animate-bounce duration-300' />
			{/* <svg
				className='animate-spin '
				viewBox='0 0 50 50'
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				style={{ transformOrigin: 'center' }}
			>
				<circle
					className='path'
					cx='25'
					cy='25'
					r='20'
					fill='none'
					stroke='currentColor'
					strokeWidth='1'
					strokeDasharray='90, 150'
					strokeDashoffset='0'
				/>
			</svg> */}
		</div>
	)
}
