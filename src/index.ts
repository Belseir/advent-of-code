import { readFile, readdir } from "fs/promises"

const args = process.argv.slice(2)

const [year, day] = args

const showDayAnswers = async (year: string, day: string): Promise<void> => {
    if (typeof day === "undefined") {
        console.error("No day specified, run with npm run start {year} {day}")
        process.exit(1)
    }

    try {
        console.log(`\nShowing answers for day ${day}`)
        const input = await readFile(
            `src/${year}/day-${day}/input.txt`,
            "utf-8"
        )
        const { partOne, partTwo } = await import(
            `./${year}/day-${day}/solution`
        )

        console.log("Answer for part one: ", partOne(input))
        console.log("Answer for part two: ", partTwo(input))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const showFullYearAnswers = async (year: string): Promise<void> => {
    console.log(`Showing answers for the year ${year}`)
    const days = (await readdir(`src/${year}/`, { withFileTypes: true }))
        .filter((dir) => dir.isDirectory())
        .map((dir) => {
            const match = dir.name.match(/\d+/g)
            if (match === null) return []
            return match[0]
        })

    for (const day of days) {
        if (typeof day === "string") await showDayAnswers(year, day)
    }
}

if (typeof year === "undefined") {
    console.error("No year specified, run with npm run start {year} {day?}")
    process.exit(1)
}

if (typeof day === "undefined") await showFullYearAnswers(year)
else await showDayAnswers(year, day.padStart(2, "0"))
