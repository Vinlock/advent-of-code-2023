import fs from 'fs/promises'

type Mode = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location'

class Mapping {
	public mappings: {
		destinationRangeStart: number
		sourceRangeStart: number
		rangeLength: number
	}[] = []

	public addMapping(destinationRangeStart: number, sourceRangeStart: number, rangeLength: number) {
		this.mappings.push({
			destinationRangeStart,
			sourceRangeStart,
			rangeLength,
		})
	}

	public getDestinationFromSource(sourceValue: number) {
		for (const {
			destinationRangeStart,
			sourceRangeStart,
			rangeLength,
		} of this.mappings) {
			if (sourceValue >= sourceRangeStart && sourceValue < (sourceRangeStart + rangeLength)) {
				const index = sourceValue - sourceRangeStart

				return destinationRangeStart + index
			}
		}

		return sourceValue
	}

	private getNumbersInRange(start: number, length: number) {
		return Array.from({ length }, (_, i) => start + i)
	}
}

export default async (input: string, seedsAsRange?: true) => {
	const lines = input.split('\n')

	let initialSeeds: number[] = []
	let seedRanges: {
		start: number
		length: number
	}[] = []

	const maps: Record<string, Mapping> = {
		'seed-to-soil': new Mapping(),
		'soil-to-fertilizer': new Mapping(),
		'fertilizer-to-water': new Mapping(),
		'water-to-light': new Mapping(),
		'light-to-temperature': new Mapping(),
		'temperature-to-humidity': new Mapping(),
		'humidity-to-location': new Mapping(),
	}

	let mode = null
	for (const line of lines) {
		const trimmedLine = line?.trim()
		if (!trimmedLine) {
			continue
		}

		if (mode === null && trimmedLine.startsWith('seeds:')) {
			const [_, seedList] = trimmedLine.split(': ')
			const seeds = seedList.split(' ').map(n => Number(n))
			if (seedsAsRange) {
				seedRanges = seeds.reduce<{
					start: number
					length: number
				}[]>((groups, seed, index, array) => {
					if (index % 2 === 0) {
						groups.push({
							start: seed,
							length: array[index + 1],
						})
					}

					return groups
				}, [])
			} else {
				initialSeeds = seeds
			}
		} else if (trimmedLine.startsWith('seed-to-soil map:')) {
			mode = 'seed-to-soil'
		} else if (trimmedLine.startsWith('soil-to-fertilizer map:')) {
			mode = 'soil-to-fertilizer'
		} else if (trimmedLine.startsWith('fertilizer-to-water map:')) {
			mode = 'fertilizer-to-water'
		} else if (trimmedLine.startsWith('water-to-light map:')) {
			mode = 'water-to-light'
		} else if (trimmedLine.startsWith('light-to-temperature map:')) {
			mode = 'light-to-temperature'
		} else if (trimmedLine.startsWith('temperature-to-humidity map:')) {
			mode = 'temperature-to-humidity'
		} else if (trimmedLine.startsWith('humidity-to-location map:')) {
			mode = 'humidity-to-location'
		} else if (mode) {
			const [
				destinationRangeStart,
				sourceRangeStart,
				rangeLength,
			] = trimmedLine.split(' ')

			maps[mode].addMapping(
				Number(destinationRangeStart.trim()),
				Number(sourceRangeStart.trim()),
				Number(rangeLength.trim()),
			)
		}
	}

	if (seedsAsRange) {
		const locations = seedRanges.map(({ start, length }) => {
			let minLocation: number = -1
			for (let seed = start; seed < start + length; seed++) {
				const soil = maps['seed-to-soil'].getDestinationFromSource(seed)
				// console.log('soil', soil)
				const fertilizer = maps['soil-to-fertilizer'].getDestinationFromSource(soil)
				// console.log('fertilizer', fertilizer)
				const water = maps['fertilizer-to-water'].getDestinationFromSource(fertilizer)
				// console.log('water', water)
				const light = maps['water-to-light'].getDestinationFromSource(water)
				// console.log('light', light)
				const temperature = maps['light-to-temperature'].getDestinationFromSource(light)
				// console.log('temperature', temperature)
				const humidity = maps['temperature-to-humidity'].getDestinationFromSource(temperature)
				// console.log('humidity', humidity)
				const location = maps['humidity-to-location'].getDestinationFromSource(humidity)

				if (minLocation === -1 || location < minLocation) {
					minLocation = location
				}
			}

			if (minLocation === -1) {
				throw new Error('still -1 for some reason')
			}

			return minLocation
		})

		return Math.min(...locations)
	} else {
		const locations = initialSeeds.map((seed) => {
			// console.log('----------')
			// console.log('seed', seed)
			const soil = maps['seed-to-soil'].getDestinationFromSource(seed)
			// console.log('soil', soil)
			const fertilizer = maps['soil-to-fertilizer'].getDestinationFromSource(soil)
			// console.log('fertilizer', fertilizer)
			const water = maps['fertilizer-to-water'].getDestinationFromSource(fertilizer)
			// console.log('water', water)
			const light = maps['water-to-light'].getDestinationFromSource(water)
			// console.log('light', light)
			const temperature = maps['light-to-temperature'].getDestinationFromSource(light)
			// console.log('temperature', temperature)
			const humidity = maps['temperature-to-humidity'].getDestinationFromSource(temperature)
			// console.log('humidity', humidity)
			return maps['humidity-to-location'].getDestinationFromSource(humidity)
		})

		return Math.min(...locations)
	}
}
