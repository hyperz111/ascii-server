import forrest from "./forrest.js";
import parrot from "./parrot.js";

/**
 * Define the frames.
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

for (const name in frames) {
  frames[name] = frames[name].map((frame) =>
    Buffer.from(`\x1b[2J\x1b[H${frame}\n`),
  );
}

export default frames;
