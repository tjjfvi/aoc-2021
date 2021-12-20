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

aoc(2021, 19, 1)

// prettier-ignore
test(`


--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

`,
!true ? (
  79
) : undefined,
true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`


--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14

`,
true ? (
  79
) : undefined,
true ? (
  -1
) : undefined,
)

// prettier-ignore
test(`

--- scanner 0 ---
0,2,0
4,1,0
3,3,0

--- scanner 1 ---
-1,-1,0
-5,0,0
-2,1,0



`,
!true ? (
  -1
) : undefined,
true ? (
  -1
) : undefined,
)

solution(async input => {
  dbg.x(input)

  type Pos = [number, number, number]
  let scanners = input.split("\n\n").map(x =>
    x
      .split("\n")
      .slice(1)
      .map(x => x.split(",").map(toNum) as Pos),
  )

  const orientations = arr(3).flatMap(axis =>
    arr(2).flatMap(dir =>
      arr(8).map(rot => {
        return (pos: Pos) => {
          let newPos = [...pos]
          newPos[axis] = pos[0] * [1, -1][dir]
          let x = [
            [1, 2],
            [2, -1],
            [-1, -2],
            [-2, 1],
            [-1, 2],
            [-2, -1],
            [1, -2],
            [2, 1],
          ][rot]
          newPos[[1, 0, 0][axis]] = pos[Math.abs(x[0])] * Math.sign(x[0])
          newPos[[2, 2, 1][axis]] = pos[Math.abs(x[1])] * Math.sign(x[1])
          return newPos as Pos
        }
      }),
    ),
  )

  console.log(new Set(orientations.map(x => x([1, 2, 3])).map(x => x + "")))

  let origScanners = [...scanners]

  let checked = new Set()
  // @ts-ignore
  for (let [bi, bar] of scanners.entries()) bar.x = bi

  main: while (scanners.length > 1) {
    console.log(scanners.length)
    for (let [fi, foo] of scanners.entries())
      for (let [bi, bar] of scanners.entries())
        if (fi < bi) {
          // @ts-ignore
          bar.x ??= bi
          let merged = check(foo, bar, bar["x" as never] as any)
          if (merged) {
            scanners[fi] = merged[0]
            scanners.splice(scanners.indexOf(bar), 1)
            continue main
          }
        }
  }
  console.log(scanners)

  for (let bar of origScanners) {
    console.log(!!check(scanners[0], bar, NaN))
  }

  function check(foo: Pos[], bar: Pos[], bi: number) {
    for (let fooAnchor of foo) {
      // let key = [fooAnchor, bi] + ""
      // if (checked.has(key)) continue
      // checked.add(key)
      for (let [oi, o] of orientations.entries())
        for (let barAnchor of bar) {
          let fooTrans = foo.map(x => sub(x, fooAnchor))
          let barTrans = bar.map(x => o(sub(x, barAnchor)))
          let b = new Set(barTrans.map(x => x + ""))
          let shared = fooTrans.filter(x => b.has(x + "")).length
          // console.log(shared, [fooTrans, barTrans])
          if (shared >= 12) {
            console.log(sub(fooAnchor, barAnchor))
            return [
              [
                ...new Set(
                  [
                    ...foo,
                    ...barTrans.map(x =>
                      sub(x as Pos, fooAnchor.map(x => -x) as Pos),
                    ),
                  ].map(x => x.join(",")),
                ),
              ].map(x => x.split(",").map(toNum) as Pos),
              sub(barAnchor, fooAnchor),
            ] as const
          }
        }
    }
  }

  function sub(a: Pos, b: Pos) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]] as Pos
  }

  return scanners[0].length
})
