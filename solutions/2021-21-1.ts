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

aoc(2021, 21, 1)

// prettier-ignore
test(`

Player 1 starting position: 4
Player 2 starting position: 8


`,
true ? (
  739785
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

  let pos = input
    .split("\n")
    .map(x => x.split(": ")[1])
    .map(x => +x)
  let die = 0
  let scores = [0, 0]

  let curP = 0
  while (Math.max(...scores) < 1000) {
    console.log(pos, scores, die)
    pos[curP] = pos[curP] + ((++die % 100) + (++die % 100) + (++die % 100))
    while (pos[curP] > 10) pos[curP] -= 10
    scores[curP] += pos[curP]
    curP = +!curP
  }

  console.log(pos, scores, die)

  return Math.min(...scores) * die
})
