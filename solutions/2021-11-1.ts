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

aoc(2021, 11, 1)

// prettier-ignore
test(`


11111
19991
19191
19991
11111


`,
// true ? (
//   -1
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
)

// prettier-ignore
test(`



5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

`,
true ? (
  1656
) : undefined,
true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let grid = input.splitm("\n", "", toNum)

  let f = 0
  for (let i = 0; i < 100; i++) {
    dbg(
      grid.map(x => x.map(x => (x === 0 ? "." : x)).join("")).join("\n") + "\n",
    )

    grid = grid.map(x => x.map(y => y + 1))

    let cont = true
    while (grid.some(x => x.some(y => y > 9))) {
      cont = false
      for (let [i, r] of grid.entries())
        for (let [j, x] of r.entries()) {
          if (x > 9) {
            r[j] = 0
            f++
            ;[-1, 0, 1].map(x =>
              [-1, 0, 1].map(y =>
                i + x in grid && j + y in grid[i + x] && grid[i + x][j + y]
                  ? grid[i + x][j + y]++
                  : 0,
              ),
            )
            cont = true
          }
        }
    }
  }

  return f
})
