import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 2', () => {
	describe('Part 1', () => {
		describe.concurrent('with test input', async () => {
			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

			it('should equal 8', async () => {

				const result = await solution(inputFile)

				expect(result.firstAnswer).toEqual(8)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 2101', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.firstAnswer).toEqual(2101)
			})
		})
	})

	describe('Part 2', () => {
		describe.concurrent('with test input', () => {
			it('should equal 2286', async () => {
				const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.secondAnswer).toEqual(2286)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal 58269', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result.secondAnswer).toEqual(58269)
			})
		})
	})
})
