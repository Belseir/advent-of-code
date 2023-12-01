import { readFile } from "fs/promises"

const args = process.argv.slice(2)

const [year, day] = args

if (typeof year === "undefined") {
    console.error("No year specified, run with npm run start {year} {day}")
    process.exit(1)
}

if (typeof day === "undefined") {
    console.error("No day specified, run with npm run start {year} {day}")
    process.exit(1)
}

console.log(`Showing answers for day ${day}`)

try {
    const input = await readFile(`src/${year}/day-${day}/input.txt`, "utf-8")
    const { partOne, partTwo } = await import(`./${year}/day-${day}/solution`)

    console.log("Answer for part one: ", partOne(input))
    console.log("Answer for part two: ", partTwo(input))
} catch (error) {
    console.error(error)
    process.exit(1)
}
