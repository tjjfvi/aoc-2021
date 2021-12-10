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

aoc(2021, 10, 1)

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
  26397
) : undefined,
true ? (
  -1
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

  let stack: string[] = []

  return dbg(
    input.split("\n").map(line => {
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
          if (y && char !== x[y])
            return [3, 57, 1197, 25137][")]}>".indexOf(char)]
        }
      }
      return 0
    }),
  ).reduce(add, 0)

  return 0
})
