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

aoc(2021, 12, 2)

// prettier-ignore
test(`


start-A
start-b
A-c
A-b
b-d
A-end
b-end



`,
true ? (
  10
) : undefined,
true ? (
  36
) : undefined,
)

// prettier-ignore
test(`


dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc


`,
true ? (
  19
) : undefined,
true ? (
  103
) : undefined,
)

// prettier-ignore
test(`


fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW


`,
true ? (
  226
) : undefined,
true ? (
  3509
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let connections = input
    .split("\n")
    .map(x => x.split("-"))
    .flatMap(x => [x, x.slice().reverse()])

  function pathfind(
    point: string,
    hist: string[],
    bool: boolean = false,
  ): number {
    if (point === "end") return 1
    if (point === point.toLowerCase() && hist.includes(point)) {
      if (!bool && point !== "start") bool = true
      else return 0
    }
    return connections
      .filter(x => x[0] === point)
      .map(y => y[1])
      .map(z => pathfind(z, [...hist, point], bool))
      .reduce(add, 0)
  }

  return pathfind("start", [])
})
