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

aoc(2021, 15, 2)

// prettier-ignore
test(`

199
199
111
991
111
199
111

`,
!true ? (
  12
) : undefined,
!true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`


1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581



`,
true ? (
  40
) : undefined,
true ? (
  315
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let risks = input.splitm("\n", "", toNum)
  risks = arr(5).flatMap(x =>
    risks.map(r => arr(5).flatMap(y => r.map(a => ((a + x + y - 1) % 9) + 1))),
  )
  console.log(risks)
  let totalRisks = risks.map(x => x.map(y => Infinity))

  let nodes = [[[0, [0, 0]] as [number, readonly [number, number]]]]

  while (true) {
    let i = nodes.reduce((a, _, i) => (i < a ? i : a), Infinity)
    let n = nodes[i]
    console.log(i, n.length, nodes.map(x => x.length).reduce(add, 0))
    delete nodes[i]
    for (let [r, p] of n ?? []) {
      if (p[0] === risks.length - 1 && p[1] === risks[p[0]].length - 1) {
        return r
      }
      for (let dir of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ] as const) {
        let q = [p[0] + dir[0], p[1] + dir[1]] as const
        let nr = risks[q[0]]?.[q[1]]
        if (!nr) continue
        let w = r + nr + risks.length - q[0] + risks[0].length - q[1] - 2
        let tr = totalRisks[q[0]][q[1]]
        if (r + nr >= tr) continue
        totalRisks[q[0]][q[1]] = r + nr
        // console.log(w)
        // while (nodes.length <= w) nodes.push([])
        ;(nodes[w] ??= []).push([r + nr, q])
      }
    }
  }

  return 0
})
