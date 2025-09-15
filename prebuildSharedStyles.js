import fs from "fs"


/* declarations */

function makeSharedStyles() {
  const data = fs.readFileSync("src/StyleClasses.tsx", "utf8")
  const regex1 = /\s+<([^\s]+)\s*className="([^"]+)"/
  const regex2 = /\W/
  const regex3 = /\/\*.*?\*\//g
  const lines = data.split("\n")
  const result = ["", "export const sharedStyles = {"] // all keys are available
  // const result = ["", "export const sharedStyles: Record<string, string> = {"] // no keys

  lines.forEach((line) => {
    let match = line.match(regex1) // text as JSX component: <class className="tw-container">

    if (match) {
      if (match[1].match(regex2)) // text with "non-word" characters
        return result.push(`  "${match[1]}": "${match[1]} ${match[2]}",`)
      else
        return result.push(`  ${match[1]}: "${match[1]} ${match[2]}",`)
    }

    match = line.match(regex3) // text as comment: /*{ comment }*/

    if (match)
      return result.push(`\n  ${match[0]}\n`)
  })

  result.push("}")
  result.push("")

  const output = result.join("\n")

  fs.writeFileSync("src/sharedStyles.ts", output)
}

/* entry point */

makeSharedStyles()
