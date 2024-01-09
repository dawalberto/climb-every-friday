'use client'

import { Route } from '@/components/domain'
import { gradesWithColors } from '@/lib/constants'
import { Route as RouteType } from '@/lib/models/routes'
import { memo, useState } from 'react'
import { useUserRole } from '.'

const MemoizedRouteComponent = memo(Route)

export const useRoute = () => {
	const { userIsAdmin: userCanEdit } = useUserRole()
	const [editingRoute, setEditingRoute] = useState<
		{ id?: string; inEditMode: false } | { id: string; inEditMode: true }
	>({ inEditMode: false })

	const RouteComponent = ({ route }: { route: RouteType }) => (
		<MemoizedRouteComponent
			route={route}
			userCanEdit={userCanEdit}
			editingRoute={editingRoute}
			setEditingRoute={setEditingRoute}
		/>
	)

	const getRouteGradeColor = (grade: Pick<RouteType, 'grade'>['grade']) => {
		return gradesWithColors.find((gradeWithColor) => gradeWithColor.grade === grade)?.colors
	}

	return {
		RouteComponent,
		getRouteGradeColor,
		editingRoute,
	}
}
