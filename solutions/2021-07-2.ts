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

aoc(2021, 7, 2)

// prettier-ignore
test(`


16,1,2,0,4,2,7,1,2,14

`,
true ? (
  37
) : undefined,
true ? (
  168
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

  let nums = input.splitm(",", toNum)
  console.log(nums.length, Math.max(...nums))

  return dbg(
    arr(nums.length * 2)
      .map(x =>
        nums
          .map(y => Math.abs(y - x))
          .map(x => (x * (x + 1)) / 2)
          .reduce(add, 0),
      )
      .map((x, i) => [i, x] as const)
      .sort(asc(x => x[1])),
  )[0][1]

  return 0
})
