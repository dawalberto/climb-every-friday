type ButtonOptions = {
	className?: string
	children: React.ReactElement
	disabled?: boolean
	buttonStyle?: 'primary' | 'success' | 'danger'
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	type?: 'button' | 'submit' | 'reset'
	title?: string
}
