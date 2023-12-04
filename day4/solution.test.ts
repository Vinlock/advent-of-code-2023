import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 4', () => {
	describe('Part 1', () => {
		describe('with test input', async () => {
			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

			it('should equal 13', async () => {

				const result = solution(inputFile)

				expect(result.firstAnswer).toEqual(13)
			})
		})

		describe('with real input', () => {
			it('should equal 22674', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = solution(inputFile)

				expect(result.firstAnswer).toEqual(22674)
			})
		})
	})

	describe('Part 2', () => {
		describe('with test input', () => {
			it('should equal 30', async () => {
				const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

				const result = solution(inputFile)

				expect(result.secondAnswer).toEqual(30)
			})
		})

		describe('with real input', () => {
			it('should equal 5747443', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = solution(inputFile)

				expect(result.secondAnswer).toEqual(5747443)
			})
		})
	})
})
