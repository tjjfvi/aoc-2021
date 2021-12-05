import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2015, 6, 1)

test(
  `


turn on 0,0 through 999,999

`,
  true ? 1000000 : undefined,
  true ? -1 : undefined,
)

test(
  `


toggle 0,0 through 999,0

`,
  true ? 1000 : undefined,
  true ? -1 : undefined,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")
  let nums = lines.map(x => +x)

  let n = [...Array(1000)].map(x => [...Array(1000)].map(x => 0))

  for (let line of lines) {
    let [, mode, A, B, C, D] =
      /^(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/.exec(line)!
    let f =
      mode === "turn on"
        ? () => 1
        : mode === "turn off"
        ? () => 0
        : (x: number) => +!x
    for (let i = +A; i <= +C; i++)
      for (let j = +B; j <= +D; j++) n[i][j] = f(n[i][j])
  }

  return n.flat().filter(x => x).length
})
