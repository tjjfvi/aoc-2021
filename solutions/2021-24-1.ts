import { from } from "form-data"
import { inspect, isBuffer } from "util"
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

  type Comp = {
    id: number
    inpDeps: number[]
    deps: number[]
    get: (inps: number[], vals: number[]) => number
    poss?: Record<number, [number[], number[]][] | undefined>
  }

  let variables: Record<string, number> = { x: 0, y: 0, z: 0, w: 0 }
  let comps: Comp[] = [
    {
      id: 0,
      inpDeps: [],
      deps: [],
      get: () => 0,
    },
  ]

  let inputId = 0
  let compId = 1

  for (let line of input.split("\n")) {
    console.log(variables)
    let op = line.split(" ")[0]
    let [aVar, bVar] = line.split(" ").slice(1)
    let aVal = isNaN(+aVar) ? comps[variables[aVar]] : +aVar
    let bVal = isNaN(+bVar) ? comps[variables[bVar]] : +bVar
    let isConst = typeof aVal === "number" && typeof bVal === "number"
    let result: Comp
    if (op === "inp") {
      let i = inputId++
      result = {
        id: compId++,
        inpDeps: [i],
        deps: [],
        get: is => is[i],
      }
    } else if ((op === "mul" && aVal === 0) || bVal === 0) result = comps[0]
    else {
      let fn: (a: number, b: number) => number
      if (op === "add") fn = (a, b) => a + b
      if (op === "mul") fn = (a, b) => a * b
      if (op === "mod") fn = (a, b) => a % b
      if (op === "div") fn = (a, b) => trunc(a / b)
      if (op === "eql") fn = (a, b) => +(a === b)
      result = {
        id: compId++,
        inpDeps: [],
        deps: [
          ...new Set([
            ...(typeof aVal === "number" ? [] : [aVal.id]),
            ...(typeof bVal === "number" ? [] : [bVal.id]),
          ]),
        ],
        get: (_, d) =>
          fn(
            typeof aVal === "number" ? aVal : d[aVal.id],
            typeof bVal === "number" ? bVal : d[bVal.id],
          ),
      }
    }
    comps[result.id] = result
    variables[aVar] = result.id
  }

  function genPoss(comp: Comp, V?: number) {
    if (comp.poss && (V === undefined || comp.poss[V])) return comp.poss!
    // console.log(comp.id)
    let depsPoss = comp.deps.map(x => genPoss(comps[x]))
    let inputs: number[] = []
    let cvs: number[] = []
    let deepPoss = comp.poss ?? []
    function inputRecursion(i: number) {
      if (i === comp.inpDeps.length) {
        compRecursion(0)
        return
      }
      for (let v = 1; v < 10; v++) {
        inputs[comp.inpDeps[i]] = v
        inputRecursion(i + 1)
      }
    }
    function compRecursion(i: number) {
      if (i === comp.deps.length) {
        let v = comp.get(inputs, cvs)
        if (v === V) (deepPoss[v] ??= []).push([inputs.slice(), cvs.slice()])
        else deepPoss[v] ??= undefined
        return
      }
      for (let v in depsPoss[i]) {
        if (isNaN(+v)) continue
        cvs[comp.deps[i]] = +v
        compRecursion(i + 1)
      }
    }
    inputRecursion(0)
    // console.log(inspect(deepPoss, undefined, Infinity), comp)
    return (comp.poss = deepPoss)
  }

  genPoss(comps[variables.z])

  let options: [number[], number[]][] = [[[], []]]
  options[0][1][variables.z] = 0

  let fin: number[][] = []

  let cur
  while ((cur = options.pop())) {
    console.log(
      cur.length,
      fin.length,
      Math.max(...fin.map(x => x.slice().reduce((a, b) => a * 10 + b, 0))),
    )
    if (cur[1].every(x => false)) {
      fin.push(cur[0])
      continue
    }
    let y: number
    for (let z in cur[1]) {
      if (isNaN(+z)) continue
      y = +z
    }
    let x = y!
    let a = cur[1][x]
    delete cur[1][x]
    // console.log(x)
    bar: for (let foo of dbg.x(genPoss(comps[x], a)[a]!)) {
      let newC = cur[0].slice()
      for (let n in foo[0]) {
        if (isNaN(+n)) continue
        if (foo[0][n] === newC[n]) continue
        if (n in newC) continue bar
        newC[n] = foo[0][n]
      }
      let newD = cur[1].slice()
      for (let n in foo[1]) {
        if (isNaN(+n)) continue
        if (foo[1][n] === newD[n]) continue
        if (n in newD) continue bar
        newD[n] = foo[1][n]
      }
      options.push([newC, newD])
    }
  }

  let ns = Math.max(...fin.map(x => x.slice().reduce((a, b) => a * 10 + b, 0)))
  console.log(ns)

  return ns
})

function trunc(a: number) {
  if (a > 0) return Math.floor(a)
  else return Math.ceil(a)
}
