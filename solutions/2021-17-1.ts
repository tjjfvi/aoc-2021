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

aoc(2021, 17, 1)

// prettier-ignore
test(`

target area: x=20..30, y=-10..-5

`,
true ? (
  45
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

  function sim(
    xv: number,
    yv: number,
    target: [number, number, number, number],
  ) {
    let x = 0,
      y = 0

    let yMax = 0

    let b = false

    while (true) {
      x += xv
      y += yv
      yMax = Math.max(y, yMax)
      xv -= Math.sign(xv)
      yv -= 1
      if (yv < 0 && y < target[2]) return b ? yMax : null
      if (x >= target[0] && x <= target[1] && y >= target[2] && y <= target[3])
        b = true
    }
  }

  let yMax = 0

  for (let xv = -500; xv < 500; xv++)
    for (let yv = -500; yv < 500; yv++) {
      let y = sim(xv, yv, dbg.x(input.match(/-?\d+/g)?.map(x => +x)) as never)
      if (y) yMax = Math.max(y, yMax)
    }

  return yMax
})
