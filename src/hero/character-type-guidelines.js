/**
 * Guidelines for character points allowed when building a character.
 *
 * See: Character Types Guidelines Table - 6E1 34
 */
const guidelines = {
  normal: {
    standard: {
      totalPoints: 25,
      matchingComplications: 15,
      maxPerComplication: 15
    },
    skilled: {
      totalPoints: 50,
      matchingComplications: 25,
      maxPerComplication: 20
    },
    competent: {
      totalPoints: 25,
      matchingComplications: 15,
      maxPerComplication: 15
    }
  },
  heroic: {
    standard: {
      totalPoints: 175,
      matchingComplications: 50,
      maxPerComplication: 25
    },
    powerful: {
      totalPoints: 225,
      matchingComplications: 50,
      maxPerComplication: 25
    },
    veryPowerful: {
      totalPoints: 275,
      matchingComplications: 50,
      maxPerComplication: 30
    }
  },
  superheroic: {
    lowPowered: {
      totalPoints: 300,
      matchingComplications: 60,
      maxPerComplication: 35
    },
    standard: {
      totalPoints: 400,
      matchingComplications: 75,
      maxPerComplication: 40
    },
    highPowered: {
      totalPoints: 500,
      matchingComplications: 75,
      maxPerComplication: 40
    },
    veryHighPowered: {
      totalPoints: 650,
      matchingComplications: 100,
      maxPerComplication: 50
    },
    cosmicallyPowerful: {
      totalPoints: Infinity,
      matchingComplications: Infinity,
      maxPerComplication: Infinity
    }
  }
}

export default guidelines
