import { LCM } from "../../utils/math"

type NodeKey = string
type Direction = "L" | "R"
type Node = Record<Direction, NodeKey>
type Network = Record<NodeKey, Node>

interface ParsedInput {
    directions: Direction[]
    network: Network
}

const parseInput = (input: string): ParsedInput => {
    const directions = input.split("\n").shift()
    const network = input
        .split("\n")
        .slice(2)
        .reduce<Network>((network, config) => {
            const [node, left, right] = config.match(
                /[A-Z]{3}/g
            ) as RegExpMatchArray
            network[node] = { L: left, R: right }
            return network
        }, {})

    return {
        directions: directions?.split("") as Direction[],
        network
    }
}

const getSteps = (
    node: NodeKey,
    directions: Direction[],
    network: Network
): number => {
    let steps = 0

    while (node[2] !== "Z") {
        const direction = directions[steps++ % (directions.length - 1)]
        node = network[node][direction as Direction]
    }

    return steps
}

const partOne = (input: string): number => {
    const { directions, network } = parseInput(input)
    return getSteps("AAA", directions, network)
}

const partTwo = (input: string): number => {
    const { directions, network } = parseInput(input)
    const positions = Object.keys(network).filter((pos) => pos.endsWith("A"))
    const steps = positions.map((pos) => getSteps(pos, directions, network))

    return steps.reduce(LCM)
}

export { partOne, partTwo }
