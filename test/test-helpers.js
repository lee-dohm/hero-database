import fs from 'fs'
import path from 'path'

export function touch (dir, file) {
  let filepath

  if (!file) {
    filepath = dir
  } else {
    filepath = path.join(dir, file)
  }

  fs.closeSync(fs.openSync(filepath, 'w'))
}

export function fixturePath (fixture) {
  return path.join(__dirname, 'fixtures', fixture)
}
