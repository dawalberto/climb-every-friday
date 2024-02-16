import { gradesWithColors } from '../constants'
import { Route } from '../models/routes'

export const getRouteGradeColor = (grade: Pick<Route, 'grade'>['grade']) => {
	return gradesWithColors.find((gradeWithColor) => gradeWithColor.grade === grade)?.colors
}

export const getRouteGradeColorForSVGDrawing = (grade: Pick<Route, 'grade'>['grade']) => {
	const colors = getRouteGradeColor(grade)
	if (colors) {
		return {
			circleColor: colors[0],
			lineColor: colors[1],
		}
	}
	return undefined
}
