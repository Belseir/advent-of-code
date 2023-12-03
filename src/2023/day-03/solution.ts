import { MATRIX_DELTAS } from "../../utils/matrix"

const explodeNumberFromStringArray = (
    arr: string[],
    startIndex: number
): {
    number: number
    left: number
    right: number
} => {
    let left = 0
    let right = 1

    while (startIndex - left >= 0 && /\d/g.test(arr[startIndex - left])) {
        left++
    }

    while (
        startIndex + right < arr.length &&
        /\d/g.test(arr[startIndex + right])
    ) {
        right++
    }

    const number = arr.slice(startIndex - left + 1, startIndex + right).join("")

    return {
        number: Number(number),
        left,
        right
    }
}

const partOne = (input: string): number => {
    let partNumberSum = 0
    const grid = input.split("\n").map((line) => line.split(""))
    const visited = new Set<`${number}:${number}`>()

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (/\d|(?:\.)|w|\s/g.test(grid[y][x])) continue
            const position = { x, y }

            for (const delta of MATRIX_DELTAS) {
                const adjacent = {
                    x: position.x + delta.x,
                    y: position.y + delta.y
                }

                const adjacentElement = grid[adjacent.y][adjacent.x]

                if (
                    adjacentElement === "undefined" ||
                    !/\d/g.test(adjacentElement) ||
                    visited.has(`${adjacent.y}:${adjacent.x}`)
                )
                    continue

                const { number, left, right } = explodeNumberFromStringArray(
                    grid[adjacent.y],
                    adjacent.x
                )

                for (let offset = -left; offset <= right; offset++) {
                    visited.add(`${adjacent.y}:${adjacent.x + offset}`)
                }

                partNumberSum += number
            }
        }
    }

    return partNumberSum
}

const partTwo = (input: string): number => {
    let gearRatioSum = 0
    const grid = input.split("\n").map((line) => line.split(""))
    const visited = new Set<`${number}:${number}`>()

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (!/\*/g.test(grid[y][x])) continue
            const position = { x, y }
            const partNumbers = []

            for (const delta of MATRIX_DELTAS) {
                const adjacent = {
                    x: position.x + delta.x,
                    y: position.y + delta.y
                }

                const adjacentElement = grid[adjacent.y][adjacent.x]

                if (
                    adjacentElement === "undefined" ||
                    !/\d/g.test(adjacentElement) ||
                    visited.has(`${adjacent.y}:${adjacent.x}`)
                )
                    continue

                const { number, left, right } = explodeNumberFromStringArray(
                    grid[adjacent.y],
                    adjacent.x
                )

                for (let offset = -left; offset <= right; offset++) {
                    visited.add(`${adjacent.y}:${adjacent.x + offset}`)
                }

                partNumbers.push(number)
            }

            if (partNumbers.length < 2) continue

            gearRatioSum += partNumbers.reduce((acc, n) => acc * n, 1)
        }
    }

    return gearRatioSum
}

export { partOne, partTwo }
