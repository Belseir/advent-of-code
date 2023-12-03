type MatrixDelta = Record<"x" | "y", -1 | 0 | 1>

const MATRIX_DELTAS: MatrixDelta[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
]

export { MATRIX_DELTAS }
