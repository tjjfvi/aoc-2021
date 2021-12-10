import { BADNAME } from "dns"
import { aoc, solution, test } from "../host/lib"
import {
  add,
  mult,
  raceGens,
  allGens,
  repeatTillConst,
  dbg,
  arr,
  asc,
  dsc,
  groupBy,
  toNum,
  _,
} from "./helpers"

aoc(2021, 10, 2)

// prettier-ignore
test(`


[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]



`,
true ? (
  -1
) : undefined,
true ? (
  288957
) : undefined,
)

// prettier-ignore
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
  dbg.x(input)

  let n = dbg(
    input.split("\n").map(line => {
      let stack: string[] = []
      let n = 0
      for (let char of line) {
        console.log([char])
        if ("<[({".includes(char)) {
          stack.push(char)
        } else {
          let x: Record<string, string> = {
            "<": ">",
            "[": "]",
            "(": ")",
            "{": "}",
          }
          let y = stack.pop()
          if (char !== x[y!]) return 0
        }
      }
      return stack
        .reverse()
        .map(x => " ([{<".indexOf(x))
        .reduce((a, b) => a * 5 + b, 0)
      return 0
    }),
  )
    .filter(x => x)
    .sort(asc(x => x))

  if (n.length % 2 === 1) return n[(n.length - 1) / 2]

  return 0
})
