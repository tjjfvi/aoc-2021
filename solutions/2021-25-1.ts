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

aoc(2021, 25, 1)

// prettier-ignore
test(`


v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>



`,
true ? (
  58
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

  let last = null
  let grid = input.splitm("\n", "")

  let i = 0
  while (last + "" !== (last = grid) + "") {
    i++
    grid = grid.map((r, i) =>
      r.map((x, j) =>
        x === "." && r[(j - 1 + r.length) % r.length] === ">"
          ? ">"
          : x === ">" && r[(j + 1) % r.length] === "."
          ? "."
          : x,
      ),
    )
    grid = grid.map((r, i) =>
      r.map((x, j) =>
        x === "." && grid[(i - 1 + grid.length) % grid.length][j] === "v"
          ? "v"
          : x === "v" && grid[(i + 1) % grid.length]?.[j] === "."
          ? "."
          : x,
      ),
    )
  }

  return i
})
