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

aoc(2021, 23, 2)

// prettier-ignore
test(`
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########




`,
!true ? (
  12521
) : undefined,
!true ? (
  44169 
) : undefined,
)

// prettier-ignore
test(`

#############
#...........#
###B#A#C#D###
  #A#B#C#D#
  #########


`,
!true ? (
  -1
) : undefined,
!true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let rows = input
    .split("\n")
    .slice(2, 4)
    .map(x =>
      x
        .split("#")
        .filter(x => x.trim())
        .map(x => "ABCD".indexOf(x)),
    )

  let cols = arr(4).map(x => [
    rows[0][x],
    [3, 2, 1, 0][x],
    [3, 1, 0, 2][x],
    rows[1][x],
  ])

  dbg(cols)

  let min = Infinity

  let todo = {} as Record<
    number,
    [(number | undefined)[][], Array<number | undefined>][]
  >

  let done = new Set()

  function pathfind(
    cols: (number | undefined)[][],
    hallway: Array<number | undefined>,
    eng: number,
  ) {
    let key = [cols, hallway] + ""
    if (done.has(key)) return
    done.add(key)
    dbg(
      cols.map(x => x.map(x => x ?? "_").join(" ")).join(" | ") + "  || ",
      hallway.map(x => x ?? "_").join(" ") + "",
      eng,
    )
    if (cols.every((x, i) => [...x].filter(x => x === i).length === 4)) {
      return eng
    }
    // if (hallway.every(x => x !== 3))
    for (let [colInd, col] of cols.entries()) {
      if (!col.some(x => x !== undefined)) continue
      if (col.every(x => x === undefined || x === colInd)) continue
      let moveInd = col.findIndex(x => x !== undefined)
      let moveVal = col[moveInd]!
      let fromInd = [2, 4, 6, 8][colInd]
      for (let toInd = 0; toInd < hallway.length; toInd++) {
        if (blocked(fromInd, toInd) || [2, 4, 6, 8].includes(toInd)) continue
        let newCols = cols.map(x => x.slice())
        let newHallway = hallway.slice()
        let newEng =
          eng + (moveInd + 1 + Math.abs(toInd - fromInd)) * 10 ** moveVal
        newCols[colInd][moveInd] = undefined
        newHallway[toInd] = moveVal
        ;(todo[newEng] ??= []).push([newCols, newHallway])
      }
    }
    for (let i = 0; i < hallway.length; i++) {
      if (hallway[i] === undefined) continue
      let val = hallway[i]!
      if (cols[val].some(x => x !== undefined && x !== val)) continue
      hallway[i] = undefined
      if (blocked(i, [2, 4, 6, 8][val])) {
        hallway[i] = val
        continue
      }
      hallway[i] = val
      let newCols = cols.map(x => x.slice())
      let newHallway = hallway.slice()
      newHallway[i] = undefined
      let colInd = cols[val].filter(x => x === undefined).length - 1
      newCols[val][colInd] = val
      let newEng =
        eng + (colInd + 1 + Math.abs([2, 4, 6, 8][val] - i)) * 10 ** val
      ;(todo[newEng] ??= []).push([newCols, newHallway])
    }
    function blocked(from: number, to: number): boolean {
      if (from > to) return blocked(to, from)
      if (to === from) return true
      return hallway.some((x, i) => x !== undefined && i >= from && i <= to)
    }
  }

  todo[0] = [[cols, [...Array(11)]]]

  // todo[0] = [
  //   [
  //     [
  //       [0, 0, 0, 0],
  //       [1, 1, 1, 1],
  //       [undefined, 2, 2, 2],
  //       [undefined, 3, 3, 3],
  //     ],
  //     [
  //       3,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       2,
  //       undefined,
  //     ],
  //   ],
  // ]

  // a = pathfind(
  //   [
  //     [undefined, 0],
  //     [2, 3],
  //     [1, 2],
  //     [3, 0],
  //   ],
  //   [1, , , , , , , , , , ,],
  //   30,
  // )
  let i = Infinity
  while (i--)
    for (let _eng in todo) {
      let eng = +_eng
      if (isNaN(eng)) continue
      for (let x of todo[_eng]) {
        let a = pathfind(...x, eng)
        if (a !== undefined) return a
      }
      delete todo[_eng]
      break
    }

  return min
})
