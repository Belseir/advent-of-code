import { wordToNumber, type Word } from "../../utils/wordToNumber"

const partOne = (input: string): number => {
    return input
        .split("\n")
        .reduce((calibrationValueSum, calibrationLine: string) => {
            const digits = calibrationLine.trim().match(/\d/g)

            if (digits === null) return calibrationValueSum

            const firstDigit = digits[0]
            const lastDigit = digits[digits.length - 1] ?? firstDigit

            return calibrationValueSum + parseInt(`${firstDigit}${lastDigit}`)
        }, 0)
}

const partTwo = (input: string): number => {
    return input
        .split("\n")
        .reduce((calibrationValueSum, calibrationLine: string) => {
            const digits = Array.from(
                calibrationLine
                    .trim()
                    .matchAll(
                        /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
                    ),
                (n) => (n[1].length > 1 ? wordToNumber(n[1] as Word) : n[1])
            )

            if (digits === null) return calibrationValueSum

            const firstDigit = digits[0]
            const lastDigit = digits[digits.length - 1] ?? firstDigit

            const calibrationValue = `${firstDigit}${lastDigit}`

            return calibrationValueSum + parseInt(calibrationValue)
        }, 0)
}

export { partOne, partTwo }
