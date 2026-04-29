/**
 * @param {string} line
 * @param {string} [std]
 * @returns {boolean}
 */
export const print = (line, std = "out") =>
  process[`std${std}`].write(
    `[${new Date().toTimeString().slice(0, 8)}] ${line}\n`,
  );
