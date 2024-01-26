import { gradesWithColors } from '../constants'
import { Route } from '../models/routes'

export const getRouteGradeColor = (grade: Pick<Route, 'grade'>['grade']) => {
	return gradesWithColors.find((gradeWithColor) => gradeWithColor.grade === grade)?.colors
}

export const getRouteGradeColorForSVGDrawing = (
	routeGrade: Route | Pick<Route, 'grade'>['grade']
) => {
	let grade: string

	if (typeof routeGrade === 'string') {
		grade = routeGrade
	} else {
		grade = routeGrade.grade
	}

	const colors = getRouteGradeColor(grade)
	if (colors) {
		return {
			circleColor: colors[0],
			lineColor: colors[1],
		}
	}
	return undefined
}
