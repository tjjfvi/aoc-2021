import exp from "constants"
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

aoc(2021, 18, 2)

// prettier-ignore
test(`




`,
true ? (
  4130
) : undefined,
true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`


`,
true ? (
  3488
) : undefined,
true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`

`,
true ? (
4140
) : undefined,
true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  type Num = number | [Num, Num]

  let nums = input.split("\n").map(x => JSON.parse(x)) as Num[]

  let canSplit = false

  function reduce(num: Num) {
    function applySplit(num: Num): Num {
      if (!canSplit) return num
      if (typeof num === "number")
        if (num > 9) {
          canSplit = false
          return [Math.floor(num / 2), Math.ceil(num / 2)]
        } else return num
      else return [applySplit(num[0]), applySplit(num[1])]
    }
    let last = ""
    while (last !== (last = JSON.stringify(num))) {
      // console.log(JSON.stringify(num), [num].flat(Infinity).reduce(add, 0))
      let explode = identifyExplode(num)
      if (explode) {
        let str = JSON.stringify(num)
        // console.log(str)
        str = str.replace(/\d+(?=\]*,\[*"x")/, x => +x + explode![0] + "")
        str = str.replace(/(?<="x"\]*,\[*)\d+/, x => +x + explode![1] + "")
        str = str.replace(/\["x"\]/, "0")
        // console.log(str)
        num = JSON.parse(str)
      } else {
        canSplit = true
        num = applySplit(num)
      }
    }
    // console.log(JSON.stringify(num) + "\n")
    return num
    function identifyExplode(num: Num, depth = 0): [number, number] | null {
      if (typeof num === "number") return null
      else if (depth === 4) {
        let b = num.pop()!
        let a = num.pop()!
        //@ts-expect-error
        num.push("x")
        if (typeof a !== "number" || typeof b !== "number") throw [a, b]
        return [a, b]
      } else
        return (
          identifyExplode(num[0], depth + 1) ??
          identifyExplode(num[1], depth + 1)
        )
    }
  }

  function mag(num: Num): number {
    if (typeof num === "number") return num
    else return 3 * mag(num[0]) + 2 * mag(num[1])
  }

  return Math.max(
    ...nums
      .map((x, i) =>
        nums
          .filter((_, j) => i !== j)
          .map(y => mag(reduce(JSON.parse(JSON.stringify([x, y]))))),
      )
      .flat(),
  )

  return mag(nums.reduce((a, b) => reduce([a, b])))
})
