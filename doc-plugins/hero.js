/**
 * @overview Converts the `@hero` JSDoc tag into the equivalent `@see` tag.
 * @module doc-plugins/hero
 */

function replacer(match, heroNotation, volume, page, description) {
  var volumeDescription

  if (volume === "1") {
    volumeDescription = "Character Creation"
  } else {
    volumeDescription = "Combat and Adventuring"
  }

  let result = `@see **HERO System 6th Edition Rules** volume ${volume} "${volumeDescription}" page ${page}`

  if (description && description.trim().length > 0) {
    result += ` &mdash; _${description.trim()}_`
  }

  return result
}

exports.handlers = {
  beforeParse: function (e) {
    e.source = e.source.replace(/@hero (6E([12]) (\d+))(.*)/g, replacer)
  }
}
