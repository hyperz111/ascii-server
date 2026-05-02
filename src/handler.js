/**
 * @description Request handler module
 */

import { print } from "./utils.js";
import frames from "./frames/$index.js";
/** @import { ServerResponse, IncomingMessage } from "node;http" */

// These data are constants, so We should store these in here to
// avoiding create a new memory on every requests
const JSON_HEADERS = { "Content-Type": "application/json" };
const CHUNKED_HEADERS = { "Transfer-Encoding": "chunked" };
// Convert to Buffer, because (maybe) this is faster
const ERROR_NOT_CURLED = Buffer.from(`{"error":"Almost done, curl it!"}`);
const ERROR_NOT_FOUND = Buffer.from(`{"error":"Frame not found"}`);

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
    const parsed = new URL(`http://localhost${request.url}`);
    // Get the frames data
    const frame =
      parsed.hash === "" &&
      parsed.search === "" &&
      frames[parsed.pathname.slice(1)];

    // If available
    if (Array.isArray(frame)) {
      // If client use `curl` command
      if (request.headers["user-agent"]?.startsWith?.("curl/")) {
        let i = 0;

        response.writeHead(200, CHUNKED_HEADERS);

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
      response.writeHead(417, JSON_HEADERS).end(ERROR_NOT_CURLED);
      return;
    }
  }

  // Not found
  response.writeHead(404, JSON_HEADERS).end(ERROR_NOT_FOUND);
  return;
};

export default handler;
