const STRING_NUMBER_MAPPING: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
}

const findFirstNumber = (str: string, {
	countNumberWords = false,
	reverse = false,
}: {
	countNumberWords?: boolean
	reverse?: boolean
} = {}) => {
	let chars = str.split('')
	if (reverse) {
		chars = chars.reverse()
	}

	let stringCache = ''
	for (const char of chars) {
		stringCache = reverse ? char.concat(stringCache) : stringCache.concat(char)

		for (const [numberString, numberValue] of Object.entries(STRING_NUMBER_MAPPING)) {
			const numberValueAsString = String(numberValue)

			if (
				(reverse && (
					stringCache.startsWith(numberValueAsString) ||
						(
							countNumberWords &&
							stringCache.startsWith(numberString)
						)
				)) ||
				(
					stringCache.endsWith(numberValueAsString) ||
					(
						countNumberWords &&
						stringCache.endsWith(numberString)
					)
				)
			) {
				return numberValue
			}
		}
	}

	return null
}

export default async (input: string, {
	countNumberWords = false,
}: {
	countNumberWords?: boolean
} = {}) => {
	const lines = input.split('\n')

	return lines.reduce((result, line, i) => {
		const firstNumber = findFirstNumber(line, {
			countNumberWords,
		})
		const lastNumber = findFirstNumber(line, {
			countNumberWords,
			reverse: true,
		})

		if (firstNumber !== null && lastNumber !== null) {
			const calibrationNumber = Number(`${firstNumber}${lastNumber}`)

			return result + calibrationNumber
		}

		return result
	}, 0)
}
