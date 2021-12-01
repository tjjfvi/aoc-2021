
import dotenv from "dotenv"
dotenv.config()

import fs from "fs/promises"
import fetch from "node-fetch"

let year: number
let day: number
let part: 1 | 2
let puzzleDrop: Promise<void> = Promise.reject()
puzzleDrop.catch(() => {})
let input: Promise<string>
let solutionFn: (input: string) => Promise<number | undefined>
let tests: [string, number?, number?][] = []

export async function aoc(_year: number, _day: number, _part: 1 | 2){
  if(year) throw new Error("aoc already called")
  year = _year
  day = _day
  part = _part
  let puzzleDropTime = Date.UTC(year, 11, day, 5, 0, 1, 0)
  if(Date.now() > puzzleDropTime)
    puzzleDrop = Promise.resolve()
  else
    puzzleDrop = new Promise(r => setTimeout(r, puzzleDropTime - Date.now()))
  input = getPuzzleInput()
}

async function getPuzzleInput(){
  if(input) return await input
  try {
    return await fs.readFile(`data/${year}/${day}/input`, "utf8")
  }
  catch (e) {
    let mkdirProm = fs.mkdir(`data/${year}/${day}`, { recursive: true })
    await puzzleDrop
    let input = (await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: {
        COOKIE: `session=${process.env.TOKEN}`,
      },
    }).then(r => r.text())).trim()
    mkdirProm.then(() =>  fs.writeFile(`data/${year}/${day}/input`, input))
    return input
  }
}

export function test(input: string, output1?: number, output2?: number){
  if(input.trim())
    tests.push([input.trim(), output1, output2])
}

export function solution(cb: typeof solutionFn){
  solutionFn = cb
}

function clear(){
  process.stdout.write("\u001b[3J\u001b[1J")
  console.clear()
}

setTimeout(async () => {
  if(!year || !day) throw new Error("aoc not called")
  if(!solution) throw new Error("solution not called")
  await puzzleDrop
  let testN = 0
  for(const [i, test] of tests.entries()) {
    if(test[part] === undefined) continue
    testN++
    clear()
    let output
    try {
      output = await solutionFn(test[0])
    }
    catch (e) {
      console.error(e)
      return
    }
    if(output !== test[part]) {
      console.error(`\nTest ${i} failed:\n  Expected: ${test[part]}\n  Got: ${output}`)
      return
    }
  }
  clear()
  let output
  try {
    output = await solutionFn(await input)
  }
  catch (e) {
    console.error(e)
    return
  }
  console.log(`\n${testN} test(s) passed (${tests.length - testN} skipped).\nOutput: ${output}`)
}, 0)

clear()
