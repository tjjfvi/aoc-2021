
import { aoc, solution, test, dbg } from "../host/lib"

aoc(2020, 3, 2)

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
336,
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

  return dbg([1, 3, 5, 7].map(x => grid.filter((r, i) => r[(i * x) % r.length]).length).concat(grid.filter((x, i) => i % 2 === 0).filter((x, i) => x[i % x.length]).length).reduce((a, b) => a * b, 1))

  return 336
})
