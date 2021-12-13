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

aoc(2021, 13, 1)

// prettier-ignore
test(`



6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5


`,
true ? (
  17
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

  let [dotsS, insts] = input.split("\n\n")

  let dots = dotsS.split("\n").map(x => x.split(",").map(toNum))

  for (let inst of insts.split("\n").slice(0, 1)) {
    let dir = inst.split(" ")[1].split("=")[0]
    let n = inst.split("=")[1]._(toNum)
    dots = dots.map(a => {
      if (dir === "y") a.reverse()
      if (a[0] > n) a[0] = n - (a[0] - n)
      if (dir === "y") a.reverse()
      return a
    })
  }

  return new Set(dots.map(x => x + "")).size
})
