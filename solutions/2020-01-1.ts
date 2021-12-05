import { aoc, solution, test } from "../host/lib"
import { dbg } from "./helpers"

aoc(2020, 1, 1)

test(
  `
1721
979
366
299
675
1456
`,
  514579,
)

solution(async input => {
  let lines = input.split("\n").map(x => +x)

  for (let a of lines)
    for (let b of lines) {
      dbg.x(`Checking ${a} + ${b}`)
      if (a + b === 2020) return a * b
    }

  return 0
})
