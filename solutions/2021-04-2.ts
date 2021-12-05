import { X509Certificate } from "crypto"
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
} from "./helpers"

aoc(2021, 4, 1)

test(
  `


7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7


`,
  true ? 1924 : undefined,
  true ? -1 : undefined,
)

test(
  `



`,
  true ? -1 : undefined,
  true ? -1 : undefined,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")

  dbg.false

  let nums = paragraphs[0].split(",").map(x => +x)
  let boards = paragraphs.slice(1).map(x =>
    x.split("\n").map(x =>
      x
        .split(/(?<=(?:...)*..) /)
        .filter(x => x)
        .map(x => x.trim())
        .map(x => +x),
    ),
  )

  let f = (board: number[][], nums: number[]) =>
    board.some(y => y.every(z => nums.includes(z))) ||
    board.some((_, i) => board.every(x => nums.includes(x[i])))
  // || board.every((r, i) => nums.includes(r[i]))
  // || board.every((r, i) => nums.includes(r[4 - i]))

  console.log(nums)

  console.log(
    boards[2].map(x => x.map(y => (nums.slice(0, 8).includes(y) ? "X" : " "))),
  )

  let n = nums.find((x, i, a) =>
    boards.every(b => dbg(f(b, a.slice(0, i + 1)), i, x)),
  )!
  console.log(n)
  let i = nums.indexOf(n)
  return (
    n *
    dbg(
      boards
        .find(x => !f(x, nums.slice(0, i)))!
        .flat()
        .filter(x => !nums.slice(0, i + 1).includes(x))
        .reduce(add, 0),
    )
  )

  dbg(boards)

  return 0
})
