/**
 * http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
 * @param n
 * @returns {boolean}
 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * http://stackoverflow.com/questions/16799469/how-to-check-if-a-string-is-a-natural-number
 * @param n
 * @returns {boolean}
 */
function isNaturalNumber(n) {
    n = n.toString();
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

/**
 * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
 *
 * @param n
 * @returns {boolean}
 */
function isInteger(n) {
    return parseInt(n) === n;
}
