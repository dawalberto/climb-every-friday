import { Option } from '../select'

export const transformEnumToSelectOptions = <T extends Record<string, string | number>>(
	enumObject: T
): Option[] => {
	return Object.keys(enumObject)
		.filter((key) => isNaN(Number(key)))
		.map((key) => ({ id: key, name: key }))
}
