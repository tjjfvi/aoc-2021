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

aoc(2021, 21, 1)

// prettier-ignore
test(`

Player 1 starting position: 4
Player 2 starting position: 8


`,
true ? (
  444356092776315
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

  let pos = input
    .split("\n")
    .map(x => x.split(": ")[1])
    .map(x => +x)
  let die = 0
  let scores = [0, 0]
  let wins = [BigInt(0), BigInt(0)]

  let n = 0
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let a of [1, 2, 3]) {
    for (let b of [1, 2, 3]) {
      for (let c of [1, 2, 3]) {
        arr[a + b + c]++
      }
    }
  }
  console.log(arr)
  const memo = {} as Record<string, number[]>
  function sim(oldPos: number[], oldScores: number[], curP: number) {
    let key = [oldPos, oldScores, curP] + ""
    if (memo[key]) return memo[key]
    if (oldScores[0] >= 21) {
      return [1, 0]
    }
    if (oldScores[1] >= 21) {
      return [0, 1]
    }
    let val = [0, 0]
    for (let [i, n] of arr.entries()) {
      if (!n) continue
      let die = i
      let pos = [...oldPos]
      let scores = [...oldScores]
      pos[curP] = pos[curP] + die
      while (pos[curP] > 10) pos[curP] -= 10
      scores[curP] += pos[curP]
      let [a, b] = sim(pos, scores, +!curP)
      val[0] += a * n
      val[1] += b * n
    }
    memo[key] = val
    return val
  }

  return Math.max(...sim(pos, scores, 0))
})
