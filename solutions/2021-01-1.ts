
import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2021, 1, 1)

test(`

199
200
208
210
200
207
240
269
260
263


`, (
  7
), (
  -1
))

test(`



`, (
  -1
), (
  -1
))

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")

  return lines.map(x => +x).filter((x, i, a) => x > a[i - 1]).length

  return 0
})
