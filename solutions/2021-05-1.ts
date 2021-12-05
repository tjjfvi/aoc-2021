import { X509Certificate } from "crypto"
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
  _,
} from "./helpers"

aoc(2021, 5, 1)

// prettier-ignore
test(`


0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2


`,
true ? (
  5
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
  let lines = input.split("\n")

  let data = lines.map(x => x.split(" -> ").map(x => x.split(",").map(x => +x)))

  let nums: number[][] = []
  for (const datum of data) {
    let [[x, X], [y, Y]] = [
      [datum[0][0], datum[1][0]],
      [datum[0][1], datum[1][1]],
    ].map(x => x.sort(asc(x => x)))
    if (x === X || y === Y)
      for (let i = x; i <= X; i++)
        for (let j = y; j <= Y; j++) {
          ;(nums[i] ||= [])[j] = (nums[i]?.[j] ?? 0) + 1
        }
  }

  console.log(
    [...nums]
      .map(x => [...(x || [])].map(x => (x ? x + "" : ".")).join(""))
      .join("\n"),
  )
  return nums.flat().filter(x => x >= 2).length

  return 0
})
