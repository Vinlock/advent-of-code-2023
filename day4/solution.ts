class Card {
	public id: number
	public numbersWon: string[] = []

	constructor(
		id: string,
		public numbers: string[],
		public winningNumbers: string[]
	) {
		this.id = Number(id)

		for (const myNumber of this.numbers) {
			for (const winningNumber of winningNumbers) {
				if (myNumber === winningNumber) {
					this.numbersWon.push(myNumber)
				}
			}
		}
	}
}

const numberOfCards = (card: Card, cardList: Card[]) => {
	const numWinningNumbers = card.numbersWon.length
	const cardId = Number(card.id)

	let numCards = 1
	for (let i = cardId + 1; i <= cardId + numWinningNumbers; i++) {
		const foundCard = cardList.find((testCard) => {
			return testCard.id === i
		})

		if (!foundCard) {
			throw new Error(`Card ${i} not found`)
		}

		numCards = numCards + numberOfCards(foundCard, cardList)
	}

	return numCards
}

export default (input: string) => {
	const lines = input.split('\n')


	let firstAnswer = 0
	let secondAnswer = 0
	const cardList: Card[] = []

	for (const [lineNumber, line] of lines.entries()) {
		if (!line) {
			continue
		}

		const [cardInfo, numbers] = line.split(':')
		const [_, cardId] = cardInfo.split(' ').filter(t => t)
		const [winningNumbers, myNumbers] = numbers.split(' | ')

		const winningNumbersList = winningNumbers.split(' ').map(w => w.trim()).filter(t => t)
		const myNumbersList = myNumbers.split(' ').map(m => m.trim()).filter(t => t)

		const newCard = new Card(cardId, myNumbersList, winningNumbersList)
		cardList.push(newCard)

		let totalPoints = 0
		for (const myNumber of myNumbersList) {
			for (const winningNumber of winningNumbersList) {
				if (winningNumber === myNumber) {
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

	for (const card of cardList) {
		secondAnswer = numberOfCards(card, cardList) + secondAnswer
	}

	return {
		firstAnswer,
		secondAnswer,
	}
}
