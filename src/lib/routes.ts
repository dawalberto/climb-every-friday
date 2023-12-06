export const routes: Route[] = [
	{
		name: 'Villena',
		path: '/villena',
		category: 'location',
		subRoutes: [
			{
				name: 'Peña rubia',
				path: '/penia-rubia',
				category: 'place',

				subRoutes: [
					{
						name: 'Competición Down',
						path: '/competicion-down',
						category: 'sector',
						subRoutes: [
							{
								name: 'Tiburón',
								path: '/tiburon',
								category: 'boulder',
							},
						],
					},
				],
			},
		],
	},
]

// path names must to be the same as ddbb - Call the getMenu() function in seed to achieve this
