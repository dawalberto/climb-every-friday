'use client'

import clsx from 'clsx'
import { buttonDanger, buttonPrimary, buttonSuccess } from './styles'

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
				'flex-center flex flex-row gap-2 rounded-md text-xl',
				'disabled:cursor-not-allowed',
				className,
				buttonStyle === 'primary' && buttonPrimary,
				buttonStyle === 'success' && buttonSuccess,
				buttonStyle === 'danger' && buttonDanger
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
