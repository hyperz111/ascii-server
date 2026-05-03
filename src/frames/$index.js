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
 * @type {Record<string, Array<Buffer>>}
 */
const frames = {
  forrest: forrest,
  parrot: parrot,
};

export default frames;
