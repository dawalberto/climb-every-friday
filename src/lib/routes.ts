export const routes = [
	// {
	// 	name: 'Home',
	// 	path: '/',
	// },
	{
		name: 'Villena',
		path: '/villena',
		subRoutes: [
			{
				name: 'Peña rubia',
				path: '/penia-rubia',
				subRoutes: [
					{
						name: 'Competición Down',
						path: '/competicion-down',
						subRoutes: [
							{
								name: 'Tiburón',
								path: '/tiburon',
							},
						],
					},
				],
			},
		],
	},
]

// path names must to be the same as ddbb
