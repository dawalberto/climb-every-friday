export const create = async (url = '', data = {}) => {
	return await configuredFetch('POST')(url, data)
}

export const update = async (url = '', data = {}) => {
	return await configuredFetch('PUT')(url, data)
}

export const remove = async (url = '', data = {}) => {
	return await configuredFetch('DELETE')(url, data)
}

const configuredFetch =
	(method: 'POST' | 'PUT' | 'DELETE') =>
	async (url = '', data = {}) => {
		// For GET I'm using swr, so I don't need this
		// Default options are marked with *
		try {
			return await fetch(url, {
				method,
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *client
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
		} catch (error) {
			throw new Error('🦍 ❌ API error', { cause: error })
		}
	}
