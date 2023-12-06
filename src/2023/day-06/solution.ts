const getRaceOutcomes = (race: number[]): number => {
    const [time, record] = race

    let waysOfBeating = 0

    for (let hold = 0; hold < time; hold++) {
        if (hold * (time - hold) > record) {
            waysOfBeating++
        }
    }

    return waysOfBeating
}

const partOne = (input: string): number => {
    const [times, distances] = input
        .split("\n")
        .map((l) => l.match(/\d+/g)?.map(Number)) as number[][]

    const parsed = times.map((time, idx) => [time, distances[idx]])
    const outcomes = parsed.map(getRaceOutcomes)
    return outcomes.reduce((errorMargin, outcome) => errorMargin * outcome, 1)
}

const partTwo = (input: string): number => {
    const race = input.split("\n").map((l) => Number(l.match(/\d+/g)?.join("")))
    return getRaceOutcomes(race)
}

export { partOne, partTwo }
