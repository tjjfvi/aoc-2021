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
  toNum,
  _,
} from "./helpers"

aoc(2021, 8, 2)

// prettier-ignore
test(`


acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf

`,
true ? (
  -1
) : undefined,
true ? (
  5353
) : undefined,
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
  -1
) : undefined,
true ? (
  61229
) : undefined,
)

solution(async input => {
  dbg.x(input)

  let ns = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
  ].map(x => x.split(""))
  dbg.false

  let n = 0
  for (let line of input.split("\n"))
    a: for (let a of "abcdefg")
      for (let b of "abcdefg")
        for (let c of "abcdefg")
          for (let d of "abcdefg")
            for (let e of "abcdefg")
              for (let f of "abcdefg")
                for (let g of "abcdefg") {
                  let x = [a, b, c, d, e, f, g]
                  if (new Set(x).size !== x.length) continue
                  let [inp, out] = line.split(" | ").map(x => x.split(" "))
                  if (
                    dbg(
                      inp
                        .map(X =>
                          X.split("")
                            .map(y => x["abcdefg".indexOf(y)])
                            .sort()
                            .join(""),
                        )
                        .sort()
                        .join(","),
                    ) ===
                    dbg(
                      ns
                        .map(x => x.sort().join(""))
                        .sort()
                        .join(","),
                    )
                  ) {
                    dbg("hi")
                    n += +out
                      .map(X =>
                        X.split("")
                          .map(y => x["abcdefg".indexOf(y)])
                          .sort()
                          .join(""),
                      )
                      .map(z => ns.findIndex(n => n.join("") === z))
                      .join("")
                  }
                }

  return n
})
