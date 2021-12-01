
import { aoc, solution, test } from "../host/lib"

aoc(2020, 5, 2)

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

  let seats  = lines.map(x => parseInt(x.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2))

  return seats.sort((a, b) => a - b).find((x, i, a) => a[i + 1] !== x + 1)! + 1

  return 0
})
