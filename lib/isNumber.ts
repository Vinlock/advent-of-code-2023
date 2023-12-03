const isNumber = (num: string | number) => {
	return !Number.isNaN(Number(num))
}

export default isNumber
