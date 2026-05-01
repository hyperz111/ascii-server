/**
 * @description Utilities module
 */

/**
 * Print message with timestamp to `process.stdout` or `process.stderr`
 * @param {string} message Message to print
 * @param {"out"|"err"} [std] Set output way (`out` is `process.stdout`, `err` is `process.stderr`)
 * @returns {boolean} `Stream.Writeable.prototype.write` return value
 */
export const print = (message, std = "out") =>
  process[`std${std}`].write(
    `[${new Date().toTimeString().slice(0, 8)}] ${message}\n`,
  );
