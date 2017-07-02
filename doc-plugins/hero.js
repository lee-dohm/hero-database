/**
 * @overview Converts the `@hero` JSDoc tag into the equivalent `@see` tag.
 * @module doc-plugins/hero
 *
 * @example
 *
 */

function replacer(match, heroNotation, volume, page, description) {
  var volumeDescription

  if (volume === "1") {
    volumeDescription = "Character Creation"
  } else {
    volumeDescription = "Combat and Adventuring"
  }

  return `@see **HERO System 6th Edition Rules** volume ${volume} "${volumeDescription}" page ${page} &mdash; _${description}_`
}

exports.handlers = {
  beforeParse: function (e) {
    e.source = e.source.replace(/@hero (6E([12]) (\d+)) ([^\n]*)/g, replacer)
  }
}
