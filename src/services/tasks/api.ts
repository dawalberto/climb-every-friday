export const createTaskByApi = async ({
	taskName,
	userId,
}: {
	taskName: string
	userId: string
}): Promise<Response> => {
	try {
		return await fetch('http://localhost:3000/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ taskName, userId }),
		})
	} catch (error) {
		throw new Error('🦍 ❌ API error', { cause: error })
	}
}
