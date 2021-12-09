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

aoc(2021, 9, 1)

// prettier-ignore
test(`


2199943210
3987894921
9856789892
8767896789
9899965678



`,
true ? (
  1134
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

  dbg.false

  let grid = input.splitm("\n", "", toNum)
  let groups = grid.flatMap((r, i) =>
    r
      .map((x, j) => [x, [i, j]] as const)
      .filter(x => x[0] !== 9)
      .map(x => [x[1]]),
  )

  console.log(groups.length)

  // let l = 0
  // main: while (groups.length !== l) {
  //   // console.log(
  //   //   grid
  //   //     .map((r, i) =>
  //   //       r
  //   //         .map((x, j) =>
  //   //           groups
  //   //             .findIndex(g => g.some(y => y + "" === [i, j] + ""))
  //   //             ._(x => (x === -1 ? "." : x + ""))
  //   //             .padStart(3),
  //   //         )
  //   //         .join(""),
  //   //     )
  //   //     .join("\n") + "\n",
  //   // )
  //   l = groups.length
  for (let i = 0; i < groups.length; i++) {
    console.log(groups.length)
    let g = groups[i]
    for (let pi = 0; pi < g.length; pi++) {
      let p = g[pi]
      for (let [I, J] of [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]) {
        let q = [p[0] + I, p[1] + J]
        if ((grid[q[0]]?.[q[1]] ?? 9) === 9) continue
        let gi = groups.findIndex(g => g.some(y => y + "" === q + ""))
        if (gi === -1 || gi === groups.indexOf(g)) continue
        g.push(...groups[gi])
        groups.splice(gi, 1)
      }
    }
  }
  // }

  return groups
    .map(g => g.length)
    .sort(dsc(x => x))
    .slice(0, 3)
    .reduce(mult, 1)

  return 0
})
