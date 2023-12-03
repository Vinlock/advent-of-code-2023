import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 1', () => {
	describe('Part 1', () => {
		describe.concurrent('with test input', async () => {
			it('should equal 142', async () => {
				const inputFile = await fs.readFile(`${__dirname}/part1_test_input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result).toEqual(142)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 54697', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result).toEqual(54697)
			})
		})
	})

	describe('Part 2', () => {
		describe.concurrent('with test input', () => {
			it('should equal 281', async () => {
				const inputFile = await fs.readFile(`${__dirname}/part2_test_input.txt`, 'utf8')

				const result = await solution(inputFile, {
					countNumberWords: true,
				})

				expect(result).toEqual(281)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 78', async () => {
				const result = await solution('7four76rklqgljhdzzhdcqrqzpxmfftbcfiveoneightjzg', {
					countNumberWords: true,
				})

				expect(result).toEqual(78)
			})

			it('should equal 54885', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile, {
					countNumberWords: true,
				})

				expect(result).toEqual(54885)
			})
		})
	})
})
