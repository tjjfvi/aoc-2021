
import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2015, 6, 2)

test(`


turn on 0,0 through 999,999

`,
true ? (
  1000000
) : undefined,
true ? (
  1000000
) : undefined,
)

test(`


toggle 0,0 through 999,0

`,
true ? (
  1000
) : undefined,
true ? (
  2000
) : undefined,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")
  let nums = lines.map(x => +x)

  let n = [...Array(1000)].map(x => [...Array(1000)].map(x => 0))

  for(let line of lines) {
    let [, mode, A, B, C, D] = /^(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/.exec(line)!
    let f = mode === "turn on" ? (x:number) => x + 1 : mode === "turn off" ? (x:number) => Math.max(x - 1, 0) : (x: number) => x + 2
    for(let i = +A; i <= +C; i++)
      for(let j = +B; j <= +D; j++)
        n[i][j] = f(n[i][j])
  }

  return n.flat().reduce(add)
})
