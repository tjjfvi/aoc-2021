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

aoc(2021, 6, 2)

// prettier-ignore
test(`


3,4,3,1,2

`,
true ? (
  5934
) : undefined,
true ? (
  26984457539
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

  let x = arr(10).map(x => nums.filter(y => y === x).length)
  console.log(x)

  for (let i = 0; i < 256; i++) {
    let a = x.shift()!
    x.push(0)
    x[6] += a
    x[8] += a
  }

  return x.reduce(add, 0)
})
