const getFrequency = <T extends number | string | symbol>(
    arr: T[]
): Record<T, number> => {
    return arr.reduce<Record<number | string | symbol, number>>(
        (frequency, element) => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            frequency[element] = (frequency[element] || 0) + 1
            return frequency
        },
        {}
    )
}

export { getFrequency }
