'use client'

import { ChangeEvent, useMemo, useState } from 'react'

type OptionalStringType<T> = {
	[P in keyof T]?: string
}
export type FormErrors<T> = OptionalStringType<Partial<T>>

type ValidateFunction<T> = (formData: T) => FormErrors<T>

export const useForm = <T>(initialFormData: T, validate: ValidateFunction<T>) => {
	const [formData, setFormData] = useState<T>(initialFormData)
	const [formErrors, setFormErrors] = useState<FormErrors<T>>({})

	// input type: text, number, textarea, date, radio
	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setFormData(
			(prevValues) =>
				({
					...prevValues,
					[name]: value,
				}) as T
		)
		const errors = validate({ ...formData, [name]: value } as T)
		setFormErrors(errors)
	}

	const handleInputToggle = (fieldName: keyof T) => {
		setFormData(
			(prevValues) =>
				({
					...prevValues,
					[fieldName]: !prevValues[fieldName],
				}) as T
		)
		const errors = validate({ ...formData, [fieldName]: !formData[fieldName] } as T)
		setFormErrors(errors)
	}

	const setValueOfFieldManually = (field: Partial<T>) => {
		setFormData(
			(prevValues) =>
				({
					...prevValues,
					...field,
				}) as T
		)
		const errors = validate({ ...formData, ...field } as T)
		setFormErrors(errors)
	}

	// input type: checkbox
	// const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const { name, checked, value } = event.target
	// 	setFormData((prevValues) => {
	// 		const prevValue = (prevValues as Record<string, unknown>)[name] as unknown as string[]
	// 		let newValue
	// 		if (checked) {
	// 			newValue = [...prevValue, value]
	// 		} else {
	// 			newValue = prevValue.filter((item) => item !== value)
	// 		}
	// 		return {
	// 			...prevValues,
	// 			[name]: newValue,
	// 		} as T
	// 	})
	// 	const errors = validate(formData as T)
	// 	setFormErrors(errors)
	// }

	const resetForm = () => {
		setFormData(initialFormData)
		setFormErrors({})
	}

	const formHasErrors = useMemo(() => Object.keys(formErrors).length > 0, [formErrors])

	return {
		formData,
		formHasErrors,
		formErrors,
		handleInputChange,
		handleInputToggle,
		setValueOfFieldManually,
		resetForm,
	}
}
