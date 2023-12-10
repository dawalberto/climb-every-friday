type ButtonOptions = {
	className?: string
	children: React.ReactElement
	disabled?: boolean
	buttonStyle?: 'primary'
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
}
