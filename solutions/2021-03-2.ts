
import { aoc, solution, test } from "../host/lib"
import { add, mult, raceGens, allGens, repeatTillConst, dbg } from "./helpers"

aoc(2021, 3, 2)

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
  230
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

  let x = []
  for(let V of [false, true]) {
    console.log(V)
    let lines2 = [...lines]
    let f = (a: string[]) => {
      let b = a.filter(x => +x).length
      let first = b > (a.length - b) ? "1" : "0"
      if(b === a.length / 2)first =  "1"
      return a.map((x, i) => i).filter(x => (a[x] === first) === V)
    }

    let inds = [...Array(lines2.length)].map((_, i) => i)

    while(lines2.length > 1) {
      console.log(inds, lines2)
      let a = f(lines2.map(x => x[0]))
      inds = inds.filter((x, i) => a.includes(i))
      lines2 = lines2.filter((x, i) => a.includes(i)).map(x => x.slice(1))
      console
    }
    console.log(inds, lines2)
    x.push(parseInt(lines[ inds[0] ], 2))
    console.log(x)
  }

  return x[0] * x[1]
})
