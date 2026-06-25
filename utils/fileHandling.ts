import * as fs from "fs"

type json = Record<string, any>

export default function fileHandling(name: string, data?: json) {
  if (data) {
    fs.writeFileSync(`data/${name}.json`, JSON.stringify(data, null, 2), 'utf-8')
    return data
  }
  
  const current = JSON.parse(fs.readFileSync(`data/${name}.json`, 'utf-8'))
  return current
}
