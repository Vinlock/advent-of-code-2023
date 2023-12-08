import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 5', () => {
	describe('Part 1', () => {
		describe('with test input', async () => {
			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

			it('should equal 35', async () => {

				const result = await solution(inputFile)

				expect(result).toEqual(35)
			})
		})

		describe('with real input', () => {
			it('should equal 331445006', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)

				expect(result).toEqual(331445006)
			})
		})
	})

	describe('Part 2', () => {
		describe('with test input', () => {
			it('should equal 46', async () => {
				const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

				const result = await solution(inputFile, true)

				expect(result).toEqual(46)
			})
		})

		describe('with real input', () => {
			it('should equal 6472060', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile, true)

				expect(result).toEqual(6472060)
			})
		})
	})
})
