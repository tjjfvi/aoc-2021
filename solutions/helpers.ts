export function arr(length: number): number[]
export function arr<T>(length: number, fn: (index: number) => T): T[]
export function arr(
  length: number,
  fn: (index: number) => unknown = i => i,
): unknown[] {
  return [...Array(length)].map((_, i) => fn(i))
}

export function asc<T>(map: (x: T) => number): (x: T, y: T) => number {
  return (a, b) => map(a) - map(b)
}

export function dsc<T>(map: (x: T) => number): (x: T, y: T) => number {
  return (a, b) => map(b) - map(a)
}

export function groupBy<T, G>(
  arr: T[],
  group: (val: T, index: number, arr: T[]) => G,
) {
  let map = new Map<G, T[]>()
  for (const [i, val] of arr.entries()) {
    let g = group(val, i, arr)
    let grp = map.get(g) ?? []
    map.set(g, grp)
    grp.push(val)
  }
  return [...map.entries()]
}

export function add(a: number, b: number) {
  return a + b
}

export function mult(a: number, b: number) {
  return a * b
}

export function raceGens<T>(gens: Generator<void, T, undefined>[]) {
  for (let i = 0; true; i++, i %= gens.length) {
    const result = gens[i].next()
    if (result.done) return result.value
  }
}

export function allGens<T>(gens: Generator<void, T, undefined>[]) {
  const values = Array(gens.length)
  let completed = 0
  for (let i = 0; completed < gens.length; i++, i %= gens.length) {
    const gen = gens[i]
    if (!gen) continue
    const result = gen.next()
    if (!result.done) continue
    values[i] = result.value
    completed++
    delete gens[i]
    i--
  }
  return values
}

export const repeatTillConst = <T>(x: T, f: (x: T) => T): T => {
  let last = x
  let cur = f(x)
  while (cur !== last) {
    last = cur
    cur = f(cur)
  }
  return cur
}

let dbgMode = true

const _dbg = <T>(x: T, ...y: unknown[]): T => {
  if (dbgMode) console.log(x, ...y)
  return x
}

_dbg.x = <T>(x: T, ..._: unknown[]) => x

Object.defineProperties(_dbg, {
  true: {
    get: () => {
      dbgMode = true
    },
  },
  false: {
    get: () => {
      dbgMode = false
    },
  },
})

export const dbg = _dbg as typeof _dbg & Record<"true" | "false", undefined>

Object.prototype._ = function (fn) {
  return fn(this)
}

declare global {
  interface Object {
    _<T, U>(this: T, fn: (val: T) => U): U
  }
}
