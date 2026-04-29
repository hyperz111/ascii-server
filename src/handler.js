import { parse } from "node:path/posix";
import { print } from "./utils.js";
import frames from "./frames.js";
/** @import { ServerResponse, IncomingMessage } from "node;http" */

/**
 * @param {ServerResponse} response
 * @param {number} status
 * @param {unknown} jsonish
 * @returns {ServerResponse}
 */
const sendJson = (response, status, jsonish) =>
  response
    .writeHead(status, { "Content-Type": "application/json" })
    .end(JSON.stringify(jsonish));

/**
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {number} interval
 * @returns {void}
 */
const handler = (request, response, interval) => {
  if (request.method === "GET" && typeof request.url === "string") {
    const parsed = parse(request.url);

    if (parsed.root === parsed.dir) {
      const frame = frames[parsed.base];

      if (frame) {
        if (request.headers["user-agent"]?.startsWith?.("curl/")) {
          let i = 0;

          response.writeHead(200, { "Transfer-Encoding": "chunked" });

          const ref = setInterval(() => {
            response.write(frame[i]);
            i = (i + 1) % frame.length;
          }, interval);

          response.on("close", () => {
            print("Client disconnected");
            clearInterval(ref);
            response.end();
          });

          return;
        }

        sendJson(response, 417, { error: `Almost done, curl it!` });
        return;
      }
    }
  }

  sendJson(response, 404, { error: `Frame not found` });
  return;
};

export default handler;
