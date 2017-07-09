/**
 * Custom math library that follows the conventions described in the HERO System 6th Edition rules.
 */
export default class HeroMath {
  /**
   * Calculates the cost of a given value of a characteristic.
   *
   * Paying points for characteristics doesn't round the same way as other things since _all
   * fractions_ (not just from 0.5) should be rounded up to the nearest whole value. Additionally,
   * characteristics below zero aren't allowed for the purposes of the cost calculation.
   *
   * @param {Number} value Value of the characteristic
   * @param {Object} info Info for the specific characteristic from `data/characteristics.json`
   * @return {Number} Cost of the given value
   * @throws {RangeError} When `value` is negative
   * @hero 6E1 40 Buying less than the full amount
   * @hero 6E1 47 Reducing Characteristics
   */
  static characteristicCost (value, info) {
    if (value < 0) {
      throw new RangeError(
        `Characteristics cannot be negative when calculating cost: ${info.name} = ${value}`
      )
    }

    return Math.ceil((value - info.base) * info.cost.pointsPer / info.cost.amount)
  }

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

    const sign = number < 0 ? -1 : 1
    const magnitude = Math.abs(number)
    const fracDigit = this.getFirstDecimalDigit(magnitude)
    let integer = Math.floor(magnitude)

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
