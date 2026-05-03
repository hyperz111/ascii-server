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

/**
 * Function to define and transform frames data
 * @param {Array<string>} frames Frames data
 * @returns {Array<Buffer>} Buffered frames
 */
export const defineFrames = (frames) =>
  frames.map((frame) => Buffer.from(`\x1b[2J\x1b[H${frame}\n`));
