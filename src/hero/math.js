/**
 * Custom math library that follows the conventions described in the HERO System 6th Edition rules.
 */
export default class HeroMath {
  /**
   * Determines the number to roll or less from a characteristic using the standard HERO formula.
   *
   * The standard formula is `9 + (CHAR/5)`.
   *
   * @param {Number} charValue Value for the characteristic
   * @return {Number} Number to roll or less on `3d6`
   * @hero 6E1 41 Characteristic Rolls
   */
  static characteristicRoll (charValue) {
    return 9 + this.round(charValue / 5, 'up')
  }

  /**
   * Rounds the number according to the HERO System 6th Edition rules.
   *
   * It always rounds numbers with a fractional part starting with `0.4` down (toward zero) and a
   * fractional part starting with `0.6` up (away from zero). Numbers with a fractional part
   * starting with `0.5` are rounded to the benefit of the player. The `direction` parameter
   * indicates which direction would be more advantageous to the player. Pass `'up'` for away from
   * zero and `'down'` for towards zero.
   *
   * @param {Number} number Number to round
   * @param {String} direction Direction to round on `0.5`
   * @return {Number} Rounded number
   * @hero 6E1 12 Character Points and Rounding
   */
  static round (number, direction) {
    if (!direction) {
      throw new Error('Direction parameter is required')
    }

    let sign = 1

    if (number < 0) {
      sign = -1
    }

    let magnitude = Math.abs(number)
    let integer = Math.floor(magnitude)
    let fracDigit = this.getFirstDecimalDigit(magnitude)

    if (fracDigit > 5) {
      integer += 1
    } else if (fracDigit === 5 && direction === 'up') {
      integer += 1
    }

    return integer * sign
  }

  static getFirstDecimalDigit (number) {
    return Math.floor(number * 10) % 10
  }
}
