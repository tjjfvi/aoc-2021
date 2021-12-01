
import { aoc, solution, test } from "../host/lib"

aoc(2020, 4, 1)

test(`


ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in

`,
2,
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

  let pass = paragraphs.map(x => Object.fromEntries(x.split("\n").join(" ").split(" ").map(x => x.split(":"))))

  return pass.filter(x => Object.keys({ ...x, cid: 5 }).length === 8).length

  return 0
})
