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

aoc(2021, 8, 1)

// prettier-ignore
test(`


acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf

`,
// true ? (
//   -1
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
)

// prettier-ignore
test(`

be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce



`,
true ? (
  26
) : undefined,
true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let ns = [
    "abcefg",
    "cf",
    "adeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "acf",
    "abcdefg",
    "abcdfg",
  ].map(x => x.split(""))

  dbg(
    groupBy(
      ns.map(x => x.length).map((x, i) => [i, x] as const),
      x => x[1],
    )
      .filter(x => x[1].length === 1)
      .map(x => x[1][0]),
  )

  return input
    .split("\n")
    .map(
      x =>
        x
          .split(" | ")[1]
          .split(" ")
          .filter(x => [2, 3, 4, 7].includes(x.length)).length,
    )
    .reduce((a, b) => a + b)

  return 0
})
