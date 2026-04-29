import forrest from "./forrest.js";

/**
 * Define the frames.
 * One frame data can be used for one or more frame name.
 * For example:
 *
 * ```js
 * import rick from "./rick.js";
 * // ...
 *
 * export default {
 *   // ...
 *   rick: rick,
 *   rickroll: rick,
 *   // ...
 * };
 * ```
 *
 * @type {Record<string, Array<string>>}
 */
export default {
  forrest: forrest,
};
