type ButtonOptions = {
	className?: string
	children: React.ReactElement
	disabled?: boolean
	buttonStyle?: 'primary' | 'success'
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
	title?: string
}
