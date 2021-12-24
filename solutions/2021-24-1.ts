import { isBuffer } from "util"
import { aoc, solution, test } from "../host/lib"
import {
  add,
  mult,
  raceGens,
  allGens,
  repeatTillConst,
  dbg,
  arr,
  asc,
  dsc,
  groupBy,
  toNum,
  _,
} from "./helpers"

aoc(2021, 24, 1)

// prettier-ignore
test(`


inp x
inp y
add x -2
add y -3
add z 1
mul z x
mul z y


`,
true ? (
  92
) : undefined,
true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`



`,
true ? (
  -1
) : undefined,
true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let variables: Record<string, string | number> = { x: 0, y: 0, z: 0, w: 0 }
  let calcs: Record<string, string> = {}
  let calsPoss: Record<string, number[]> = {}

  let i = 0
  let c = 0

  for (let line of input.split("\n")) {
    console.log(variables)
    let op = line.split(" ")[0]
    let [aVar, bVar] = line.split(" ").slice(1)
    let aVal = isNaN(+aVar) ? variables[aVar] : +aVar
    let bVal = isNaN(+bVar) ? variables[bVar] : +bVar
    let isConst = typeof aVal === "number" && typeof bVal === "number"
    let result: string | number = 0
    if (op === "inp") result = "o.i" + i++
    else if (op === "add")
      if (isConst) result = +aVal + +bVal
      else if (!aVal) result = bVal
      else if (!bVal) result = aVal
      else result = `(${aVal} + ${bVal})`
    else if (op === "mul")
      if (isConst) result = +aVal * +bVal
      else if (!aVal || !bVal) result = 0
      else if (aVal === 1) result = bVal
      else if (bVal === 1) result = aVal
      else result = `(${aVal} * ${bVal})`
    else if (op === "div")
      if (isConst) result = trunc(+aVal / +bVal)
      else if (bVal === 1) result = aVal
      else result = `trunc(${aVal} / ${bVal})`
    else if (op === "mod")
      if (isConst) result = +aVal % +bVal
      else if (
        ((calcs["c" + c] = `(${aVal} % ${bVal})`),
        smartEqual("o.c" + c++, aVal) === 1)
      )
        console.log((result = aVal))
      else result = `(${aVal} % ${bVal})`
    else if (op === "eql")
      if (isConst) result = +aVal === +bVal ? 1 : 0
      else result = smartEqual(aVal, bVal)
    if (typeof result === "string" && !result.startsWith("o.")) {
      let cn = "c" + c++
      calcs[cn] = result
      result = "o." + cn
    }
    variables[aVar] = result
  }
  function smartEqual(a: string | number, b: string | number) {
    let ap = poss(a)
    let bp = poss(b)
    if (ap + "" === bp + "") return 1
    if (ap.every(x => !bp.includes(x))) return 0
    return `(${a} === ${b} ? 1 : 0)`
  }
  function poss(x: string | number) {
    // console.log(x)
    if (typeof x === "number") return [x]
    x = x.slice(2)
    if (calsPoss[x]) return calsPoss[x]
    if (x.startsWith("i")) return [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // console.log(x, calcs[x])
    let variables = [...new Set(calcs[x].match(/[ic]\d+/g)! ?? [])]
    let p = new Set<number>()
    let o = {} as any
    function bar(i: number) {
      if (i === variables.length) {
        p.add(eval(calcs[x]))
        return
      }
      for (let v of poss("o." + variables[i])) {
        o[variables[i]] = v
        bar(i + 1)
      }
    }
    bar(0)
    return (calsPoss[x] = [...p].sort())
  }
  function trunc(a: number) {
    if (a > 0) return Math.floor(a)
    else return Math.ceil(a)
  }

  let solveMemo: Record<string, any> = {}
  function solve(x: string, v: number): [string, number][][] {
    let key = x + "=" + v
    if (solveMemo[key]) return solveMemo[key]
    // console.log(x)
    if (x.startsWith("i"))
      if (v > 0 && v < 10) return [[[x, v]]]
      else return []
    console.log(x, v)
    let variables = [...new Set(calcs[x].match(/[ic]\d+/g)! ?? [])]
    let p = new Set<number>()
    let o = {} as any
    let solves: [string, number][][] = []
    function bar(i: number) {
      if (i === variables.length) {
        let val = eval(calcs[x])
        if (val === v) solves.push(variables.map(x => [x, o[x]]))
        return
      }
      for (let v of poss("o." + variables[i])) {
        o[variables[i]] = v
        bar(i + 1)
      }
    }
    bar(0)
    solveMemo[key] = solves
    return solves
  }

  let options: [string, number][][] = []
  function doSolve(prev: [string, number][], curs: [string, number][][]) {
    for (let cur of curs) {
      if (
        cur.some(x =>
          [...cur, ...prev].some(y => x[0] === y[0] && x[1] !== y[1]),
        )
      )
        continue
      cur = cur.filter(x => !prev.some(y => x[0] === y[0]))
      if (!cur.length) {
        options.push(prev)
        console.log(options)
        continue
      }
      doSolve(
        [...prev, cur[0]],
        solve(cur[0][0], cur[0][1]).map(x => [...x, ...cur.slice(1)]),
      )
    }
  }

  doSolve([], [[[`${variables.z}`.slice(2), 0]]])

  let vals = options
    .map(x =>
      x
        .filter(x => x[0].startsWith("i"))
        .sort(asc(x => +x[0].slice(1)))
        .map(x => x[1])
        .reverse()
        .reduce((a, b) => a * 10 + b, 0),
    )
    .sort(dsc(x => x))
  console.log(vals)

  return vals[0]
})
