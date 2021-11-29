
import { aoc, solution, test, dbg } from "../host/lib"

aoc(2020, 3, 1)

test(`


..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#


`,
7,
-1,
)

test(`



`,
-1,
-1,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")

  let grid = lines.map(line => line.split("").map(x => x === "#"))

  return grid.filter((r, i) => r[(i * 3) % r.length]).length

  return 0
})
