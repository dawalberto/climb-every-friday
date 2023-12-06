export const routes = [
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

// path names must to be the same as ddbb - Call the getMenu() function in seed to achieve this
