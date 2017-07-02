/**
 * Functions for formatting things the HERO System way.
 */
export default class Format {
  /**
   * Returns the standard notation of this number or less as a {@link String}.
   *
   * @param {Number} orLess Number to roll equal to or less than on `3d6`.
   * @return {String} Standard roll notation.
   */
  static roll (orLess) {
    return `${orLess}-`
  }
}
