import { fileURLToPath } from "url"
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

aoc(2021, 20, 1)

// prettier-ignore
test(`

..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###


`,
!true ? (
  3351
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

  let key = input.split("\n\n")[0]
  let grid = input
    .split("\n\n")[1]
    .split("\n")
    .map(x => x.split("").map(x => x === "#"))

  let pad = false
  for (let i = 0; i < 50; i++) {
    console.log(
      grid.map(x => x.map(y => (y ? "#" : ".")).join("")).join("\n") + "\n",
    )
    for (let x = 0; x < 1; x++) {
      grid.unshift([...Array(grid[0].length)].map(x => pad))
      grid.push([...Array(grid[0].length)].map(x => pad))
      for (let x of grid) {
        x.unshift(pad)
        x.push(pad)
      }
    }
    let newGrid = [...grid.map(x => x.slice())]
    for (let [i, r] of newGrid.entries())
      for (let [j, val] of r.entries()) {
        let neighbors = ""
        for (let I = -1; I < 2; I++)
          for (let J = -1; J < 2; J++)
            neighbors += +(grid[i + I]?.[j + J] ?? pad)
        newGrid[i][j] = key[parseInt(neighbors, 2)] === "#"
      }
    grid = newGrid
    pad = key[+pad * 511] === "#"
  }
  console.log(
    grid.map(x => x.map(y => (y ? "#" : ".")).join("")).join("\n") + "\n",
  )

  return grid.flat().filter(x => x).length
})
