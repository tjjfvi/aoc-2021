import { notDeepEqual } from "assert"
import { from } from "form-data"
import { inspect, isBuffer } from "util"
import { MessagePort } from "worker_threads"
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
!true ? (
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
  type Node =
    | {
        type: "const"
        value: number
      }
    | {
        type: "op"
        op: "add" | "mul" | "div" | "mod" | "eql" | "round"
        a: Node
        b: Node
      }
    | {
        type: "proxy"
        inner: Node
      }
    | {
        type: "input"
        index: number
      }
    | {
        type: "neq"
        a: Node
        b: Node
        t: Node
        f: Node
      }

  let zero = { type: "const", value: 0 } as const

  let indexI = 0

  let variables: Record<string, Node> = { x: zero, y: zero, z: zero, w: zero }

  for (let line of input.split("\n")) {
    let op = line.split(" ")[0]
    let [a, b] = line
      .split(" ")
      .slice(1)
      .map(x =>
        isNaN(+x) ? variables[x] : ({ type: "const", value: +x } as const),
      )
    variables[line.split(" ")[1]] =
      op === "inp"
        ? {
            type: "input",
            index: indexI++,
          }
        : {
            type: "op",
            op: op as never,
            a,
            b,
          }
  }

  function printNode(node: Node, map = new Map<Node, number>()): string {
    while (node.type === "proxy") node = node.inner
    if (node.type === "const") return node.value + ""
    if (node.type === "input") return "i" + node.index
    if (map.has(node)) return "v" + map.get(node)
    if (node.type === "neq") {
      let a = printNode(node.a, map)
      let b = printNode(node.b, map)
      let t = printNode(node.t, map)
      let f = printNode(node.f, map)
      let v = map.size
      map.set(node, v)
      console.log(`v${v}: ${a} != ${b} ? ${t} : ${f}`)
      return `v${v}`
    }
    let a = printNode(node.a, map)
    let b = printNode(node.b, map)
    let v = map.size
    map.set(node, v)
    console.log(
      `v${v}: ${a} ${
        {
          add: "+",
          mul: "*",
          eql: "==",
          div: "/",
          mod: "%",
          neq: "!=",
          round: "round",
        }[node.op]
      } ${b}`,
    )
    return `v${v}`
  }

  function compile(node: Node, checked = new Set<Node>()): boolean {
    while (node.type === "proxy") node = node.inner
    if (checked.has(node)) return false
    checked.add(node)
    function eq(a: Node, b: Node) {
      return unwrap(a, a => unwrap(b, b => a === b))
    }
    if (node.type === "neq") {
      let rangeA = range(node.a)
      let rangeB = range(node.b)
      if (rangeA[1] < rangeB[0] || rangeB[1] < rangeA[0]) {
        setNode(node, node.t)
        return true
      }
      if (
        rangeA[0] === rangeA[1] &&
        rangeA[0] === rangeB[0] &&
        rangeB[0] === rangeB[1]
      ) {
        setNode(node, node.f)
        return true
      }
      let a = node.a
      let b = node.b
      if (unwrap(node.f, x => x.type === "neq" && eq(a, x.a) && eq(b, x.b))) {
        setNode(node, {
          ...node,
          f: unwrap(node.f, x => (x as any).f),
        })
        return true
      }
      return !!(
        +compile(node.a, checked) |
        +compile(node.b, checked) |
        +compile(node.t, checked) |
        +compile(node.f, checked)
      )
    }
    if (node.type === "op") {
      if (isConst(node.a) && isConst(node.b)) {
        let a = getConst(node.a)
        let b = getConst(node.b)
        let v = comp(node.op, a, b)
        setNode(node, { type: "const", value: v })
      }
      if (node.op === "mul" && [node.a, node.b].some(x => isConst(x, 0))) {
        setNode(node, zero)
        return true
      }
      if (node.op === "add" && isConst(node.a, 0)) {
        setNode(node, node.b)
        return true
      }
      if (node.op === "add" && isConst(node.b, 0)) {
        setNode(node, node.a)
        return true
      }
      if (node.op === "mul" && isConst(node.a, 1)) {
        setNode(node, node.b)
        return true
      }
      if (node.op === "mul" && isConst(node.b, 1)) {
        setNode(node, node.a)
        return true
      }
      if (node.op === "div" && isConst(node.b, 1)) {
        setNode(node, node.a)
        return true
      }
      if (
        node.op === "eql" &&
        isConst(node.b, 0) &&
        unwrap(node.a, x => x.type === "op" && x.op === "eql")
      ) {
        setNode(node, {
          type: "neq",
          a: unwrap(node.a, x => (x.type === "op" ? x.a : null!)),
          b: unwrap(node.a, x => (x.type === "op" ? x.b : null!)),
          t: { type: "const", value: 1 },
          f: zero,
        })
        return true
      }
      if (
        node.op === "mul" &&
        isConst(node.b, 26) &&
        unwrap(
          node.a,
          x => x.type === "op" && x.op === "div" && isConst(x.b, 26),
        )
      ) {
        setNode(node, {
          type: "op",
          op: "round",
          a: unwrap(node.a, x => (x as any).a) as any,
          b: node.b,
        })
        return true
      }
      if (+compile(node.a, checked) | +compile(node.b, checked)) {
        checked.delete(node)
        return compile(node) || true
      }
      if (unwrap(node.b, x => x.type === "neq")) {
        let x = unwrap(node.b, x => (x.type === "neq" ? x : null!))
        let n: Node = {
          ...x,
          t: {
            type: "op",
            op: node.op,
            a: node.a,
            b: x.t,
          },
          f: {
            type: "op",
            op: node.op,
            a: node.a,
            b: x.f,
          },
        }
        compile(n)
        setNode(node, n)
        return true
      }
      if (isConst(node.b) && unwrap(node.a, x => x.type === "neq")) {
        let x = unwrap(node.a, x => (x.type === "neq" ? x : null!))
        let n: Node = {
          ...x,
          t: {
            type: "op",
            op: node.op,
            a: x.t,
            b: node.b,
          },
          f: {
            type: "op",
            op: node.op,
            a: x.f,
            b: node.b,
          },
        }
        compile(n)
        setNode(node, n)
        return true
      }
      // if (node.op === "mul") console.log(printNode(node.b))
    }
    return false
    function unwrap<T>(node: Node, f: (x: Node) => T) {
      while (node.type === "proxy") node = node.inner
      return f(node)
    }
    function setNode(node: Node, toNode: Node) {
      Object.assign(node, { type: "proxy", inner: toNode })
    }
    function isConst(node: Node, val?: number) {
      while (node.type === "proxy") node = node.inner
      return node.type === "const" && (val === undefined || node.value === val)
    }
    function getConst(node: Node) {
      while (node.type === "proxy") node = node.inner
      if (node.type !== "const") throw new Error("Invalid getConst")
      return node.value
    }
  }

  while (compile(variables.z));
  function range(node: Node): [number, number] {
    while (node.type === "proxy") node = node.inner
    if (node.type === "const") return [node.value, node.value]
    if (node.type === "input") return [1, 9]
    if (node.type === "neq") {
      let vs = [...range(node.t), ...range(node.f)]
      return [Math.min(...vs), Math.max(...vs)]
    }
    if (node.op === "eql") return [0, 1]
    let a = range(node.a)
    let b = range(node.b)
    if (node.op === "mod") {
      if (a[0] < 0) throw 0
      return [0, Math.min(a[1], b[1])]
    }
    let op = node.op
    let vs = a.flatMap(x => b.flatMap(y => comp(op, x, y)))
    return [Math.min(...vs), Math.max(...vs)]
  }

  function comp(op: Extract<Node, { type: "op" }>["op"], a: number, b: number) {
    return op === "add"
      ? a + b
      : op === "mul"
      ? a * b
      : op === "div"
      ? trunc(a / b)
      : op === "mod"
      ? a % b
      : op === "eql"
      ? +(a === b)
      : op === "round"
      ? trunc(a / b) * b
      : op
  }

  console.log(printNode(variables.z))
  console.log(range(variables.z))

  return 0
})

function trunc(a: number) {
  if (a > 0) return Math.floor(a)
  else return Math.ceil(a)
}
