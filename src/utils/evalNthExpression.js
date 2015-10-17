/**
 * Evaluates nth expressions by parsing them
 * This is quite dirty and needs to be refactored later though it works fine
 * @param {string} expression - mathematical expression in the form an+b
 * @param {number} index - current elements index
 */
export default function evalNthExpression(expression, index) {
  if (expression === 'odd') {
    return index % 2 !== 0;
  }

  if (expression === 'even') {
    return index % 2 === 0;
  }

  let split = expression.split('n');

  if (split.length > 1) {
    split[0] = split[0] === '-' ? '-1' : split[0];

    let multiplier = split[0] ? parseInt(split[0], 10) : 0;
    let addend = split[1] ? parseInt(split[1], 10) : 0;

    if (multiplier) {
      if (multiplier < 0 && index > addend || multiplier > 0 && index < addend) {
        return false;
      }

      return ((index - addend) / multiplier) % 1 === 0;
    } else {
      return index >= addend;
    }
  } else {
    return index == expression;
  }
}
