const toasterStyle =
	'bg-amber-50 rounded-md items-center px-4 py-2 flex space-x-2 shadow-md w-full border-2 border-amber-900'
export const toasterStyles = {
	error: `text-red-500 ${toasterStyle}`,
	success: `text-green-400 ${toasterStyle}`,
	warning: `text-yellow-400 ${toasterStyle}`,
	info: `text-blue-400 ${toasterStyle}`,
}
