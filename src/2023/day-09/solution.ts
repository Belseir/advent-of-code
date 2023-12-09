const parseInput = (input: string): number[][] =>
    input.split("\n").map((l) => l.split(" ").map(Number))

const getSequence = (history: number[]): number[] =>
    history.slice(1).map((num, i) => num - history[i])

const generateSequences = (history: number[]): number[][] => {
    if (history.every((n) => n === 0)) {
        return [history]
    }
    return [history, ...generateSequences(getSequence(history))]
}

const extrapolate = (
    history: number[][],
    direction: "left" | "right"
): number => {
    const [current, ...rest] = history
    if (current.every((n) => n === 0)) return 0
    return direction === "left"
        ? current[0] - extrapolate(rest, direction)
        : extrapolate(rest, direction) + current[current.length - 1]
}

const getExtrapolationSum = (
    input: string,
    extrapolationDirection: "left" | "right"
): number => {
    const report = parseInput(input)
    const sequences = report.map(generateSequences)
    const predictions = sequences.map((s) =>
        extrapolate(s, extrapolationDirection)
    )

    return predictions.reduce((sum, prediction) => sum + prediction, 0)
}

const partOne = (input: string): number => getExtrapolationSum(input, "right")

const partTwo = (input: string): number => getExtrapolationSum(input, "left")

export { partOne, partTwo }
