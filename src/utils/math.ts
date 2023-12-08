const GCM = (a: number, b: number): number => (b === 0 ? a : GCM(b, a % b))

const LCM = (a: number, b: number): number => (a * b) / GCM(a, b)

export { GCM, LCM }
