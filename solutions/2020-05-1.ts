
import { aoc, solution, test } from "../host/lib"

aoc(2020, 5, 1)

test(`



`,
-1,
-1,
)

test(`



`,
-1,
-1,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")

  return Math.max(...lines.map(x => parseInt(x.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2)))

  return 0
})
