'use client'

import clsx from 'clsx'
import { buttonPrimary } from './styles'

export const Button = ({
	className,
	children,
	disabled = false,
	buttonStyle,
	onClick,
	type = 'button',
	title,
}: ButtonOptions) => {
	return (
		<button
			className={clsx(
				'flex-center flex flex-row gap-2 rounded-md px-4 py-2 text-xl',
				'disabled:cursor-not-allowed',
				className,
				buttonStyle === 'primary' && buttonPrimary
			)}
			disabled={disabled}
			onClick={onClick}
			type={type}
			title={title}
		>
			{children}
		</button>
	)
}
