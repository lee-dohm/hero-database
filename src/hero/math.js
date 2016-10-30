/** @babel */

/**
 * Custom math library that follows the conventions described in the Hero System 6th Edition rules.
 */
export default class HeroMath {
  static characteristicRoll (charValue) {
    return 9 + this.round(charValue / 5)
  }

  /**
   * Public: Rounds the `number` according to the Hero System 6th Edition rules.
   *
   * It always rounds numbers with a fractional part starting with `0.4` down (toward zero) and a
   * fractional part starting with `0.6` up (away from zero). Numbers with a fractional part
   * starting with `0.5` are rounded to the benefit of the player. The `direction` parameter
   * indicates which direction would be more advantageous to the player. Pass `'up'` for away from
   * zero and `'down'` for towards zero.
   *
   * See: "Character Points and Rounding" - 6E1 12
   */
  static round (number, direction) {
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
