import isNumber from './isNumber'

const containsNumber = (input: string | string[] | (string | number)[]) => {
	const chars = Array.isArray(input) ? input : input.split('')

	return chars.some((iter) => {
		return isNumber(iter)
	})
}

export default containsNumber
