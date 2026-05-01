/**
 * @description Request handler module
 */

import { parse } from "node:path/posix";
import { print } from "./utils.js";
import frames from "./frames/$index.js";
/** @import { ServerResponse, IncomingMessage } from "node;http" */

/**
 * Helper for send JSON response.
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
 * Request handler function.
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {number} interval
 * @returns {void}
 */
const handler = (request, response, interval) => {
  // Check if the method is GET and request URL is available
  if (request.method === "GET" && typeof request.url === "string") {
    // Parse
    const parsed = parse(request.url);

    /**
     * Possible paths:
     * - /
     * - /parrot
     * - /parrot?what
     */
    if (parsed.root === parsed.dir) {
      // Get the frames data
      const frame = frames[parsed.base];

      // If available
      if (Array.isArray(frame)) {
        // If client use `curl` command
        if (request.headers["user-agent"]?.startsWith?.("curl/")) {
          let i = 0;

          response.writeHead(200, { "Transfer-Encoding": "chunked" });

          // Start animation
          const ref = setInterval(() => {
            response.write(frame[i]);
            i = (i + 1) % frame.length;
          }, interval);

          // Stop the animation on client disconnect
          response.on("close", () => {
            print("Client disconnected");
            clearInterval(ref);
            response.end();
          });

          return;
        }

        // For non-curled client
        sendJson(response, 417, { error: `Almost done, curl it!` });
        return;
      }
    }
  }

  // Not found
  sendJson(response, 404, { error: `Frame not found` });
  return;
};

export default handler;
