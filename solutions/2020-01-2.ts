
import { aoc, solution, test } from "../host/lib"
import { dbg } from "./helpers"

aoc(2020, 1, 2)

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
  241861950,
)

solution(async input => {
  let lines = input.split("\n").map(x => +x)

  for(let a of lines)
    for(let c of lines)
      for(let b of lines) {
        dbg.x(`Checking ${a} + ${b}`)
        if(a + b + c === 2020)
          return a * b * c
      }

  return 0
})
