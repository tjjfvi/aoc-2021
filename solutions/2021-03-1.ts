
import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2021, 3, 1)

test(`

00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010



`,
true ? (
  198
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


  let f = (a: string[]) => {
    console.log(a)
    let b = a.filter(x => +x).length
    let first = b > (a.length - b) ? "1" : "0"
    return first
  }

  let a = [...Array(lines[0].length)].map((_, x) => f(lines.map(y => y[x])))
  console.log(a)

  let b = a.map(x => +!+x)
  console.log(b)

  return parseInt(a.join(""), 2) * parseInt(b.join(""), 2)
})
