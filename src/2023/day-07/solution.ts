import { getFrequency } from "../../utils/frequency"

type HandWithBid = Array<string | number>

const parseInput = (input: string): HandWithBid[] =>
    input
        .split("\n")
        .map((line) => line.split(" "))
        .map(([hand, bid]) => [hand, Number(bid)])

const getTotalWinnings = (hands: HandWithBid[]): number => {
    const totalWinnings = hands.reduce((totalWinnings, [hand, bid], idx) => {
        return totalWinnings + (bid as number) * (idx + 1)
    }, 0)

    return totalWinnings
}

const getHandStrengthOf = (hand: string, withJoker = false): number => {
    const frequency = getFrequency(hand.split(""))
    let values = Object.values(frequency)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (frequency.J && values.length > 1 && withJoker) {
        const highestAmount = Object.keys(frequency)
            .filter((card) => card !== "J")
            .reduce((a, b) => (frequency[a] > frequency[b] ? a : b))

        frequency[highestAmount] += frequency.J
        delete frequency.J

        values = Object.values(frequency)
    }

    switch (true) {
        case values.includes(5):
            return 6
        case values.includes(4):
            return 5
        case values.includes(3) && values.includes(2):
            return 4
        case values.includes(3):
            return 3
        case values.filter((n) => n === 2).length === 2:
            return 2
        case values.includes(2):
            return 1
        default:
            return 0
    }
}

const sortByHandRank = (
    hands: HandWithBid[],
    cardStrength: string,
    withJoker = false
): HandWithBid[] => {
    const strengths = cardStrength.split("")

    return hands.sort((a, b) => {
        const handA = a[0] as string
        const handB = b[0] as string

        const handAStrength = getHandStrengthOf(handA, withJoker)
        const handBStrength = getHandStrengthOf(handB, withJoker)

        if (handAStrength === handBStrength) {
            for (let i = 0; i < 5; i++) {
                if (handA[i] === handB[i]) continue
                return strengths.indexOf(handA[i]) - strengths.indexOf(handB[i])
            }
        }

        return handAStrength - handBStrength
    })
}

const partOne = (input: string): number => {
    const handsWithBid = parseInput(input)
    const cardStrength = "23456789TJQKA"
    const sortedHands = sortByHandRank(handsWithBid, cardStrength)
    const totalWinnings = getTotalWinnings(sortedHands)

    return totalWinnings
}

const partTwo = (input: string): number => {
    const handsWithBid = parseInput(input)
    const cardStrength = "J23456789TQKA"
    const sortedHands = sortByHandRank(handsWithBid, cardStrength, true)
    const totalWinnings = getTotalWinnings(sortedHands)

    return totalWinnings
}

export { partOne, partTwo }
