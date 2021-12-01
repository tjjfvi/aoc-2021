
import { aoc, solution, test } from "../host/lib"
import { dbg } from "./helpers"

aoc(2020, 2, 1)

test(`


1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

`,
2,
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

  return lines.filter(x => {
    let [a, b] = x.split(": ")
    let [c, d] = a.split(" ")
    let [A, B] = c.split("-")
    dbg(x)
    let e  = b.split("").filter(x => x === d).length
    dbg(A, B)
    return e >= +A && e <= +B
  }).length

  return 0
})
