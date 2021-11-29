
import { aoc, solution, test, dbg } from "../host/lib"

aoc(2020, 2, 2)

test(`


1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

`,
2,
1,
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
    const r = (b[+A - 1] === d) !== (b[+B - 1] === d)
    return r
  }).length

  return 0
})
