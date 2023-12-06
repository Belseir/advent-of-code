interface Range {
    source: number
    destination: number
    length: number
}
type Map = Range[]

const MAPS_REGEX = /(\d+ \d+ \d+(\r\n)*)+/g
const SEEDS_REGEX = /(?:seeds:) (\d+ )+\d+/g

const parseMap = (stringMap: string): Map =>
    stringMap
        .split(/\r\n/g)
        .filter((line) => line.trim() !== "")
        .map((line) => {
            const [destination, source, length] = line
                .split(" ")
                .filter((n) => /\d/g.test(n))
                .map(Number)

            const range: Range = { destination, source, length }

            return range
        })

const parseSeeds = (input: string): number[] =>
    input
        .match(SEEDS_REGEX)?.[0]
        .replace("seeds: ", "")
        .split(" ")
        .map(Number) ?? []

const isInBetween = (n: number, start: number, end: number): boolean =>
    n >= start && n <= end

const includesSeed = (ranges: number[][], seed: number): boolean =>
    ranges.some(([start, end]) => isInBetween(seed, start, end))

const applyMap = (stage: number, map: Map): number =>
    applyMapOrReversedMap(stage, map)

const applyReversedMap = (stage: number, map: Map): number =>
    applyMapOrReversedMap(stage, map, true)

const applyMapOrReversedMap = (
    stage: number,
    map: Map,
    isReversed = false
): number => {
    for (let { destination, source, length } of map) {
        if (isReversed) {
            ;[source, destination] = [destination, source]
        }

        if (isInBetween(stage, source, source + length)) {
            return stage + destination - source
        }
    }
    return stage
}

const partOne = (input: string): number => {
    let seeds = parseSeeds(input)
    const withoutSeeds = input.replace(SEEDS_REGEX, "")
    const maps = (withoutSeeds.match(MAPS_REGEX) ?? []).map(parseMap)

    seeds = seeds.map((seed) => maps.reduce(applyMap, seed))

    return Math.min(...seeds)
}

const partTwo = (input: string): number => {
    const seeds = parseSeeds(input)
    const withoutSeeds = input.replace(SEEDS_REGEX, "")
    const maps = (withoutSeeds.match(MAPS_REGEX) ?? [])
        .map(parseMap)
        .toReversed()

    const pairs = []
    for (let i = 0; i < seeds.length; i += 2) {
        pairs.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
    }

    let location = 0
    let reversedSeed: number

    do {
        reversedSeed = maps.reduce(applyReversedMap, location)
        location++
    } while (!includesSeed(pairs, reversedSeed))

    return location - 1
}

export { partOne, partTwo }
