/**
 * @description Frames data module
 */

import forrest from "./forrest.js";
import parrot from "./parrot.js";

/**
 * Define the frames in here.
 * One frame data can be used for one or more frame name.
 * For example:
 *
 * ```js
 * import rick from "./rick.js";
 * // ...
 *
 * const frames = {
 *   // ...
 *   rick: rick,
 *   rickroll: rick,
 *   // ...
 * };
 * ```
 *
 * @type {Record<string, Array<string>>}
 */
const frames = {
  forrest: forrest,
  parrot: parrot,
};

/**
 * Transformed frames data store.
 * @type {Record<string, Buffer>}
 */
const transformed = {};

/**
 * Transform the frames data on load, so We will NOT
 * transforming on every request.
 */
for (const name in frames) {
  /**
   * Transform on each the frames value;
   * 1. Add clear screen ANSI code at the start frame
   * 2. Add newline at the end frame
   * 3. Transform the frame to Node.js buffer
   */
  transformed[name] = frames[name].map((frame) =>
    Buffer.from(`\x1b[2J\x1b[H${frame}\n`),
  );
}

export default transformed;
