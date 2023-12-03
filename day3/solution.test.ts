import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 3', () => {
	describe('Part 1', () => {
		describe.concurrent('with test input', async () => {
			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

			it('should equal 4361', async () => {

				const result = await solution(inputFile)

				expect(result.firstAnswer).toEqual(4361)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 533784', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.firstAnswer).toEqual(533784)
			})
		})
	})

	describe('Part 2', () => {
		describe.concurrent('with test input', () => {
			it('should equal 467835', async () => {
				const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.secondAnswer).toEqual(467835)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 78826761', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.secondAnswer).toEqual(78826761)
			})
		})
	})
})
