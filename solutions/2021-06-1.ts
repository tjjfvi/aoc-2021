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

aoc(2021, 6, 1)

// prettier-ignore
test(`


3,4,3,1,2

`,
true ? (
  5934
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

  let nums = input.splitm(",", toNum)

  for (let i = 0; i < 80; i++) {
    for (let [i, n] of nums.entries()) {
      nums[i]--
      if (nums[i] === -1) {
        nums[i] = 6
        nums.push(9)
      }
    }
  }

  return nums.length
})
