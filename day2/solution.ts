const MAX_NUM_RED_CUBES = 12
const MAX_NUM_GREEN_CUBES = 13
const MAX_NUM_BLUE_CUBES = 14

export default async (input: string) => {
	const lines = input.split('\n')

	const possible: number[] = []

	let firstAnswer = 0
	let secondAnswer = 0

	for (const line of lines) {
		if (!line) {
			continue
		}

		const [game, cubeList] = line.split(': ')
		const gameId = game.split(' ')[1]
		const cubeSets = cubeList.split(';')
			.map((cubeSet) => {
				return cubeSet.trim().split(',')
			})

		let isPossible = true
		const amounts: Record<'red' | 'green' | 'blue', number[]> = {
			red: [],
			green: [],
			blue: [],
		}

		for (const cubeSet of cubeSets) {
			const cubes = cubeSet.map((cube) => {
				return cube.trim()
			})

			for (const cube of cubes) {
				const [countStr, color] = cube.split(' ') as [string, keyof typeof amounts]
				const count = Number(countStr)

				amounts[color].push(count)

				if (
					color === 'blue' && count > MAX_NUM_BLUE_CUBES ||
					color === 'green' && count > MAX_NUM_GREEN_CUBES ||
					color === 'red' && count > MAX_NUM_RED_CUBES
				) {
					isPossible = false
				}
			}
		}

		const maxRed = Math.max(...amounts['red'])
		const maxGreen = Math.max(...amounts['green'])
		const maxBlue  = Math.max(...amounts['blue'])
		secondAnswer = (maxRed * maxGreen * maxBlue) + secondAnswer

		if (isPossible) {
			firstAnswer = firstAnswer + Number(gameId)
		}
	}

	return {
		firstAnswer,
		secondAnswer,
	}
}
