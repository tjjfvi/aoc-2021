
import { aoc, solution, test, dbg } from "../host/lib"

aoc(2020, 4, 2)

test(`


pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

`,
-1,
4,
)

test(`

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007


`,
-1,
0,
)

solution(async input => {
  let lines = input.split("\n")
  let paragraphs = input.split("\n\n")

  let pass = paragraphs.map(x => Object.fromEntries(x.split("\n").join(" ").split(" ").map(x => x.split(":"))))

  return pass.filter(x => (Object.keys({ ...x, cid: 5 }).length === 8) && +x.byr >= 1920 && +x.byr <= 2002
  && +x.iyr >= 2010 && +x.iyr <= 2020
  && +x.eyr >= 2020 && +x.eyr <= 2030
  && ((h, hn) => h.endsWith("in") ? hn >= 59 && hn <= 76 : h.endsWith("cm") && hn >= 150 && hn <= 193)(x.hgt, +x.hgt.slice(0, -2))
  && /^#[\dabcdef]{6}$/.test(x.hcl)
  && "amb blu brn gry grn hzl oth".split(" ").includes(x.ecl)
  && /^\d{9}$/.test(x.pid),
  ).length

  return 0
})
