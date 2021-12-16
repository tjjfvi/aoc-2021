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

aoc(2021, 16, 2)

// // prettier-ignore
// test(`

// D2FE28

// `,
// true ? (
//   6
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
// )

// // prettier-ignore
// test(`

// 38006F45291200

// `,
// true ? (
//   9
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
// )

// // prettier-ignore
// test(`

// EE00D40C823060

// `,
// !true ? (
// -1
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
// )
// // prettier-ignore
// test(`

// 8A004A801A8002F478

// `,
// true ? (
// 16
// ) : undefined,
// true ? (
//   -1
// ) : undefined,
// )
// // prettier-ignore
// test(`

// CE00C43D881120

// `,
// true ? (
//   -1
// ) : undefined,
// true ? (
// 9
// ) : undefined,
// )

test(
  `

C200B40A82

`,
  true ? -1 : undefined,
  true ? 3 : undefined,
)

test(
  `

04005AC33890

`,
  true ? -1 : undefined,
  true ? 54 : undefined,
)

test(
  `

880086C3E88112

`,
  true ? -1 : undefined,
  true ? 7 : undefined,
)

test(
  `

CE00C43D881120

`,
  true ? -1 : undefined,
  true ? 9 : undefined,
)

test(
  `

D8005AC2A8F0

`,
  true ? -1 : undefined,
  true ? 1 : undefined,
)

solution(async input => {
  dbg.x(input)

  let bin = input
    .split("")
    .map(x => parseInt(x, 16).toString(2).padStart(4, "0"))
    .join("")
  console.log(input, bin)
  let ind = 0
  let n = 0

  type Packet = (
    | { type: "lit"; value: string }
    | { type: "op"; children: Packet[]; lengthType: boolean }
  ) & {
    version: number
    typeId: number
  }

  function parsePacket(): Packet {
    console.log(bin.slice(ind))
    let version = parseInt(bin.slice(ind, (ind += 3)), 2)
    n += version
    let typeId = parseInt(bin.slice(ind, (ind += 3)), 2)
    console.log(version, typeId)
    if (typeId === 4) {
      let cont = true
      let message = ""
      while (cont) {
        cont = parseInt(bin[ind++], 2) === 1
        message += bin.slice(ind, (ind += 4))
      }
      return { type: "lit" as const, value: message, version, typeId }
    } else {
      let lengthType = bin[ind++] === "1"
      let packets = []
      if (lengthType) {
        let count = parseInt(bin.slice(ind, (ind += 11)), 2)
        for (let i = 0; i < count; i++) {
          packets.push(parsePacket())
        }
      } else {
        let count = parseInt(bin.slice(ind, (ind += 15)), 2)
        console.log(count)
        let endInd = ind + count
        while (ind !== endInd) {
          packets.push(parsePacket())
        }
      }
      return { type: "op", version, typeId, children: packets, lengthType }
    }
  }

  function evalu(packet: Packet): number {
    if (packet.type === "lit") return parseInt(packet.value, 2)
    let values = packet.children.map(evalu)
    switch (packet.typeId) {
      case 0:
        return values.reduce(add, 0)
      case 1:
        return values.reduce(mult, 1)
      case 2:
        return Math.min(...values)
      case 3:
        return Math.max(...values)
      case 5:
        return values[0] > values[1] ? 1 : 0
      case 6:
        return values[0] < values[1] ? 1 : 0
      case 7:
        return values[0] === values[1] ? 1 : 0
    }
    return 0
  }

  let packet = parsePacket()
  console.log(bin.slice(ind))
  console.log(JSON.stringify(packet, null, 2), n)

  return evalu(packet)
})
