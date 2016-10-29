const characteristics = {
  strength: {
    abbrev: 'STR',
    base: 10,
    multiplier: 1,
    description: "Indicates a character's lifting ability and base HTH damage"
  },
  dexterity: {
    abbrev: 'DEX',
    base: 10,
    multiplier: 2,
    description: "Determines who acts  rst in combat and provides DEX-based Skill Rolls"
  },
  constitution: {
    abbrev: 'CON',
    base: 10,
    multiplier: 1,
    description: "Determines if a character is Stunned in combat and provides CON Rolls"
  },
  intelligence: {
    abbrev: 'INT',
    base: 10,
    multiplier: 1,
    description: "Provides Perception Rolls and INT-based Skill Rolls"
  }
  ego: {
    abbrev: 'EGO',
    base: 10,
    multiplier: 1,
    description: "Determines character’s resistance to most Mental Powers, provides EGO Rolls"
  },
  presence: {
    abbrev: 'PRE',
    base: 10,
    multiplier: 1,
    description: "Allows character to make Presence Attacks, provides PRE-based Skill Rolls"
  },
  offensiveCombatValue: {
    abbrev: 'OCV',
    base: 3,
    multiplier: 5,
    description: "Indicates the character’s accuracy in combat"
  },
  defensiveCombatValue: {
    abbrev: 'DCV',
    base: 3,
    multiplier: 5,
    description: "Indicates how hard it is to hit the character in combat"
  },
  offensiveMentalCombatValue: {
    abbrev: 'OMCV',
    base: 3,
    multiplier: 3,
    description: "Indicates the character’s accuracy in Mental combat"
  },
  defensiveMentalCombatValue: {
    abbrev: 'DMCV',
    base: 3,
    multiplier: 3,
    description: "Indicates how hard it is to hit the character in Mental combat"
  },
  speed: {
    abbrev: 'SPD',
    base: 2,
    multiplier: 10,
    description: "Determines how frequently the character gets to act in each Turn of combat"
  },
  physicalDefense: {
    abbrev: 'PD',
    base: 2,
    multiplier: 1,
    description: "Protects the character from Physical attacks (such as punches and clubs)"
  },
  energyDefense: {
    abbrev: 'ED',
    base: 2,
    multiplier: 1,
    description: "Protects the character from Energy attacks (such as  re and lasers)"
  },
  recovery: {
    abbrev: 'REC',
    base: 4,
    multiplier: 1,
    description: "Indicates how quickly the character recovers from being Knocked Out or injured"
  },
  endurance: {
    abbrev: 'END',
    base: 20,
    multiplier: 0.2,
    description: 'The “personal energy” that “fuels” many abilities and powers'
  },
  body: {
    abbrev: 'BODY',
    base: 10,
    multiplier: 1,
    description: "Indicates how hard it is to kill the character"
  },
  stun: {
    abbrev: 'STUN',
    base: 20,
    multiplier: 0.5,
    description: "Indicates how hard it is to Knock Out the character"
  }
}

export default characteristics
