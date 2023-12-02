type Color = "red" | "green" | "blue"

const partOne = (input: string): number => {
    const SEARCHING = {
        red: 12,
        green: 13,
        blue: 14
    }

    return input.split("\n").reduce((acc, game, id) => {
        const sets = game.replace(/Game [0-9]*: /g, "").split(";")

        const isValidGame = sets.every((set) => {
            const pulls = set.split(",").reduce((acc, pull) => {
                const [amount, color] = pull.trim().split(" ")

                return {
                    ...acc,
                    [color]: Number(amount)
                }
            }, {})

            return Object.entries(pulls).every(([color, value]) => {
                return (value as number) <= SEARCHING[color as Color]
            })
        })

        return isValidGame ? acc + id + 1 : acc
    }, 0)
}

const partTwo = (input: string): number => {
    return input.split("\n").reduce((acc, game) => {
        const maxCubes = {
            red: 0,
            green: 0,
            blue: 0
        }

        game.replace(/Game [0-9]*: /g, "")
            .split(";")
            .forEach((set) => {
                set.split(",").forEach((cube) => {
                    const [amount, color] = cube.trim().split(" ")
                    maxCubes[color as Color] = Math.max(
                        maxCubes[color as Color],
                        Number(amount)
                    )
                })
            })

        return acc + maxCubes.red * maxCubes.green * maxCubes.blue
    }, 0)
}

export { partOne, partTwo }
