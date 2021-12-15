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

aoc(2021, 14, 1)

// prettier-ignore
test(`


NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C

`,
true ? (
 2188189693529
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

  let polymer = input.split("\n\n")[0].split("")
  let repls = input
    .split("\n\n")[1]
    .split("\n")
    .map(x => x.split(" -> "))

  let pairs = Object.fromEntries(
    groupBy(polymer.map((x, i, a) => x + a[i + 1]).slice(0, -1), x => x).map(
      x => [x[0], x[1].length],
    ),
  )
  console.log(pairs)

  for (let i = 0; i < 40; i++) {
    let newPairs: typeof pairs = {}
    for (let pair in pairs) {
      if (pair == "_") continue
      let n = repls.find(x => x[0] === pair)?.[1]
      if (n != null) {
        for (let np of [pair[0] + n, n + pair[1]]) {
          newPairs[np] ??= 0
          newPairs[np] += pairs[pair]
        }
      } else {
        newPairs[pair] ??= 0
        newPairs[pair] += pairs[pair]
      }
    }
    pairs = newPairs
  }

  console.log(pairs)
  let x = groupBy(
    [
      ...Object.entries(pairs).map(([x, y]) => [x[0], y] as const),
      [polymer[polymer.length - 1], 1] as const,
    ],
    x => x[0],
  )
    .map(x => [x[0], x[1].reduce((a, b) => a + b[1], 0)] as const)
    .sort(asc(x => x[1]))

  let min = x[0][1]
  let max = x[x.length - 1][1]

  return max - min
})
