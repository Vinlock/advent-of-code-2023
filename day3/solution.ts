class Part {
	public endPosition: number

	constructor(
		public lineNumber: number,
		public position: number,
		public length: number,
		public type: 'number' | 'gear' | 'symbol',
		public content: string,
	) {
		this.endPosition = position + (length - 1)
	}

	public isAdjacentTo(part: Part) {
		if (this.isSamePart(part)) {
			throw new Error('Should never somehow compare the same part...')
		} else if (this.isAdjacentLine(part.lineNumber)) {
			const paddedStart = Math.max(this.position - 1, 0)
			const paddedEnd = this.endPosition + 1

			return this.rangesIntercept([part.position, part.endPosition], [paddedStart, paddedEnd])
		} else if (part.lineNumber === this.lineNumber) {
			return this.rangesIntercept([Math.max(this.position - 1, 0), Math.max(this.position - 1, 0)], [part.position, part.endPosition]) ||
				this.rangesIntercept([this.endPosition + 1, this.endPosition + 1], [part.position, part.endPosition])
		}

		return false
	}

	private isSamePart(part: Part) {
		return part.lineNumber === this.lineNumber &&
			part.position === this.position
	}

	private rangesIntercept(firstRange: [number, number], secondRange: [number, number]) {
		const [first, second] = [firstRange, secondRange].sort((a, b) => {
			return a[0] < b[0] ? 0 : 1
		})

		return Math.max(first[0], second[0]) <= Math.min(first[1], second[1])
	}

	private isAdjacentLine(lineNumber: number) {
		return lineNumber >= 0 && Math.abs(this.lineNumber - lineNumber) === 1
	}
}

export default async (input: string) => {
	const lines = input.split('\n')

	const isNumber = (num: number | string) => {
		return !Number.isNaN(Number(num))
	}

	const parts: Part[] = []

	lines.forEach((line, lineIndex) => {
		const chars = line.split('')

		let position: number | null = null
		let numStr = ''

		chars.forEach((char, charIndex) => {
			if (isNumber(char) && position === null) {
				position = charIndex
				numStr = numStr.concat(char)
			} else if (isNumber(char) && position !== null) {
				numStr = numStr.concat(char)
			} else if (!isNumber(char) && position !== null) {
				parts.push(new Part(lineIndex, position, numStr.length, 'number', line.substr(position, numStr.length)))
				if (char !== '.') {
					parts.push(new Part(lineIndex, charIndex, 1, char === '*' ? 'gear' : 'symbol', line.substr(charIndex, 1)))
				}

				position = null
				numStr = ''
			} else if (!isNumber(char) && position === null && char !== '.') {
				parts.push(new Part(lineIndex, charIndex, 1, char === '*' ? 'gear' : 'symbol', line.substr(charIndex, 1)))
			}
		})
		if (position !== null) {
			parts.push(new Part(lineIndex, position, numStr.length, 'number', line.substr(position, numStr.length)))
		}
	})

	const partNumbers = parts.filter((part) => {
		return part.type === 'number'
	})

	const partSymbols = parts.filter((part) => {
		return part.type !== 'number'
	})

	const partGears = parts.filter((part) => {
		return part.type === 'gear'
	})

	let firstAnswer = 0
	for (const partNumber of partNumbers) {
		for (const partSymbol of partSymbols) {
			if (partNumber.isAdjacentTo(partSymbol)) {
				firstAnswer = Number(partNumber.content) + firstAnswer
				break
			}
		}
	}

	let secondAnswer = 0
	for (const partGear of partGears) {
		const adjacentNumbers = []
		for (const partNumber of partNumbers) {
			if (partGear.isAdjacentTo(partNumber)) {
				adjacentNumbers.push(partNumber)
			}
		}
		if (adjacentNumbers.length === 2) {
			const answer = Number(adjacentNumbers[0].content) * Number(adjacentNumbers[1].content)
			secondAnswer = answer + secondAnswer
		}
	}

	return {
		firstAnswer,
		secondAnswer,
	}
}
