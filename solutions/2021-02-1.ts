
import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2021, 2, 1)

test(`

forward 5
down 5
forward 8
up 3
down 8
forward 2


`,
true ? (
  150
) : undefined,
true ? (
  -1
) : undefined,
)

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
  let paragraphs = input.split("\n\n")
  let nums = lines.map(x => +x)


  let x = 0,
    y = 0

  for(const line of lines) {
    let [dir, n] = line.split(" ")
    if(dir[0] === "f")x += +n
    if(dir[0] === "d")y += +n
    if(dir[0] === "u")y -= +n
  }

  return x * y
})
