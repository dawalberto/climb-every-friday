'use client'

import { Combobox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'

export type Option = { id: string; name: string }

type SelectOptions = {
	options: Option[]
	defaultValue: Option
	onChange: (optionSelected: Option) => void
}

export const Select = ({ options, defaultValue, onChange }: SelectOptions) => {
	const [query, setQuery] = useState('')

	const filteredOptions =
		query === ''
			? options
			: options.filter((option) =>
					option.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  )

	return (
		<Combobox by='id' defaultValue={defaultValue} onChange={onChange}>
			<div className='relative z-10'>
				<div className='relative w-full border-0 border-b-2 border-amber-300 bg-transparent focus:border-amber-600 focus:ring-0'>
					<Combobox.Input
						className='w-full rounded-md border-none bg-transparent  pl-3 pr-1 text-2xl  focus:ring-0'
						displayValue={(option: Option) => option.name}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<HiChevronUpDown className='size-6 text-gray-400' aria-hidden='true' />
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					afterLeave={() => setQuery('')}
				>
					<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-amber-50 text-lg shadow-lg ring-1 ring-black/5 focus:outline-none'>
						{filteredOptions.length === 0 && query !== '' ? (
							<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
								Nothing found 🤷‍♂️
							</div>
						) : (
							filteredOptions.map((option) => (
								<Combobox.Option
									key={option.id}
									className={({ active }) =>
										clsx(
											'relative cursor-pointer select-none py-1.5 pl-6 pr-4',
											active ? 'bg-amber-600 text-white' : 'text-gray-900'
										)
									}
									value={option}
								>
									{({ selected, active }) => (
										<>
											<span
												className={clsx(
													'block truncate',
													selected ? 'pl-4 font-medium' : 'font-normal'
												)}
											>
												{option.name}
											</span>
											{selected ? (
												<span
													className={clsx(
														'absolute inset-y-0 left-0 flex items-center pl-3',
														active ? 'text-white' : 'text-amber-600'
													)}
												>
													<HiCheck
														className='size-5'
														aria-hidden='true'
													/>
												</span>
											) : null}
										</>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	)
}
