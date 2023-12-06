'use client'

import { User } from '@/lib/types/user'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GiMountaintop } from 'react-icons/gi'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function LoginForm({ users }: { users: User[] }) {
	const [formState, setFormState] = useState<FormDataState>({ state: 'idle' })
	const router = useRouter()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setFormState({ state: 'loading' })
		const formData = new FormData(event.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')

		try {
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
			})

			if (!response?.error) {
				router.push('/')
				router.refresh()
			} else {
				setFormState({
					state: 'error',
					error: 'credentials',
					message: '🦍 Uppss wrong password',
				})
			}
		} catch (error) {
			setFormState({
				state: 'error',
				error: 'unknown',
				message: '🦍 Uppss something went wrong',
			})
		}
	}

	return (
		<form className='flex flex-col gap-1' onSubmit={handleSubmit}>
			<select
				name='email'
				id='email'
				required
				className='rounded-sm  text-xl focus:border-amber-400 focus:ring-amber-400'
			>
				{users.map(({ id, name, email }) => (
					<option key={id} value={email}>
						{name}
					</option>
				))}
			</select>
			<input
				type='password'
				placeholder='Password'
				id='password'
				name='password'
				required
				minLength={6}
				className='rounded-sm text-xl focus:border-amber-400 focus:ring-amber-400'
			/>
			<button
				className={clsx(
					'flex-center flex w-full flex-row gap-2 rounded-b-sm bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xl text-white hover:from-amber-500 hover:to-amber-700 active:bg-amber-800 active:from-amber-600',
					'disabled:cursor-not-allowed disabled:from-amber-100 disabled:to-amber-300'
				)}
				disabled={formState.state === 'loading'}
				type='submit'
			>
				<span>Sign in</span>
				<GiMountaintop
					className={clsx('h-6 w-6', formState.state === 'loading' && 'animate-spin')}
				/>
			</button>
			<div
				className='mt-3 flex h-4 justify-between px-1'
				aria-live='polite'
				aria-atomic='true'
			>
				{formState?.error === 'credentials' && (
					<>
						<HiOutlineExclamationCircle className='h-5 w-5 text-red-500' />
						<p className='text-sm text-red-500'>{formState.message}</p>
					</>
				)}
			</div>
		</form>
	)
}
