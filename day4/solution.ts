export default async (input: string) => {
	const lines = input.split('\n')

	let firstAnswer = 0
	const numOfWinningNumbers: Record<string, number> = {}
	for (const [lineNumber, line] of lines.entries()) {
		if (!line) {
			continue
		}

		const [cardInfo, numbers] = line.split(':')
		const [_, cardNumber] = cardInfo.split(' ')
		const [winningNumbers, myNumbers] = numbers.split(' | ')

		const winningNumbersList = winningNumbers.split(' ').map(w => w.trim()).filter(t => t)
		const myNumbersList = myNumbers.split(' ').map(m => m.trim()).filter(t => t)

		let totalPoints = 0
		for (const myNumber of myNumbersList) {
			// console.log('myNumber', myNumber)
			for (const winningNumber of winningNumbersList) {
				// console.log('winningNumber', winningNumber)
				if (winningNumber === myNumber) {
					numOfWinningNumbers[cardNumber] += 1
					if (totalPoints === 0) {
						totalPoints = 1
					} else {
						totalPoints = totalPoints * 2
					}
				}
			}
		}
		firstAnswer = totalPoints + firstAnswer
	}

	return {
		firstAnswer,
		numOfWinningNumbers,
	}
}
