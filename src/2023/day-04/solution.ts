const parseInput = (input: string): number[][][] =>
    input
        .replace(/Card [1-9]*: /g, "")
        .split("\n")
        .reduce((acc: number[][][], line: string) => {
            const numbers = line.split(" | ").map((e) => {
                const matches = e.match(/\d*\S/g)
                if (matches === null) return []

                return matches.map(Number)
            })

            acc.push(numbers)
            return acc
        }, [])

const partOne = (input: string): number => {
    const scratchcards = parseInput(input)

    const totalWorth = scratchcards.reduce((totalWorth, scratchcard) => {
        const [winning, current] = scratchcard
        const cardWorth = current.reduce((cardWorth, number) => {
            if (winning.includes(number))
                cardWorth = cardWorth === 0 ? 1 : cardWorth * 2
            return cardWorth
        }, 0)

        return totalWorth + cardWorth
    }, 0)

    return totalWorth
}

const partTwo = (input: string): number => {
    const originalScratchcards = parseInput(input)
    const amounts = new Array(originalScratchcards.length).fill(1)

    const totalScratchcards = originalScratchcards.reduce(
        (totalScratchcards, scratchcard, idx) => {
            const [winning, current] = scratchcard
            const matchingNumbers = current.filter((n) =>
                winning.includes(n)
            ).length

            for (let i = 1; i <= matchingNumbers; i++) {
                amounts[idx + i] += 1 * amounts[idx]
                totalScratchcards += 1 * amounts[idx]
            }

            return totalScratchcards
        },
        0
    )

    return totalScratchcards + originalScratchcards.length
}

export { partOne, partTwo }
