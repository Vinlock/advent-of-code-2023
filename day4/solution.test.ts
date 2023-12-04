import fs from 'fs/promises'
import { describe, it, expect, } from 'vitest'
import solution from './solution'

describe('Day 4', () => {
	describe('Part 1', () => {
		describe.concurrent('with test input', async () => {
			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')

			it('should equal 13', async () => {

				const result = await solution(inputFile)

				expect(result).toEqual(13)
			})
		})

		describe.concurrent('with real input', () => {
			it('should equal', async () => {
				const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')

				const result = await solution(inputFile)
				console.log('result', result)
			})
		})
	})

	// describe('Part 2', () => {
	// 	describe.concurrent('with test input', () => {
	// 		it('should equal', async () => {
	// 			const inputFile = await fs.readFile(`${__dirname}/test_input.txt`, 'utf8')
	//
	// 			const result = await solution(inputFile)
	// 		})
	// 	})
	//
	// 	describe.concurrent('with real input', () => {
	// 		it('should equal', async () => {
	// 			const inputFile = await fs.readFile(`${__dirname}/input.txt`, 'utf8')
	//
	// 			const result = await solution(inputFile)
	// 		})
	// 	})
	// })
})
