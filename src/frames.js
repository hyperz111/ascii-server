import { join } from "node:path";

/**
 * List all frames in here
 * @type {Record<string, string>}
 */
const frames = {
  forrest: "forrest"
};

const dir = join(import.meta.dirname, "frames");

for (const frame in frames) {
  frames[frame] = await import(join(dir, `${frame}.js`)).then((module) =>
    module.default.map((frame) => Buffer.from(`\x1b[2J\x1b[H${frame}\n`)),
  );
}

export default frames;
