export const createTask = async ({
	taskName,
	userId,
}: {
	taskName: string
	userId: string
}): Promise<Response> => {
	try {
		const apiResponse = await fetch('http://localhost:3000/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ taskName, userId }),
		})
		const response = await apiResponse.json()
		return { ...apiResponse, ...response }
	} catch (error) {
		throw new Error('🦍 ❌ API error', { cause: error })
	}
}
