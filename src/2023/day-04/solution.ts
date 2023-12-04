const parseInput = (input: string): number[][][] =>
    input
        .replace(/Card [1-9]*: /g, "")
        .split("\n")
        .map((line: string) =>
            line.split(" | ").map((e) => {
                const matches = e.match(/\d*\S/g)
                if (matches === null) return []

                return matches.map(Number)
            })
        )

const amountOfMatchingCards = (scratchcard: number[][]): number => {
    const [winning, current] = scratchcard
    return current.filter((n) => winning.includes(n)).length
}

const partOne = (input: string): number => {
    const scratchcards = parseInput(input)

    const totalWorth = scratchcards.reduce((totalWorth, scratchcard) => {
        const matchingAmount = amountOfMatchingCards(scratchcard)
        const cardWorth = Math.floor(2 ** matchingAmount / 2)

        return totalWorth + cardWorth
    }, 0)

    return totalWorth
}

const partTwo = (input: string): number => {
    const originalScratchcards = parseInput(input)
    const amounts = new Array(originalScratchcards.length).fill(1)

    const totalScratchcards = originalScratchcards.reduce(
        (totalScratchcards, scratchcard, idx) => {
            for (let i = 1; i <= amountOfMatchingCards(scratchcard); i++) {
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
