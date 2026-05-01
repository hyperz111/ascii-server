/**
 * @description Main server module
 */

import { Server } from "node:http";
import handler from "./handler.js";
import { print } from "./utils.js";

// Configuration
const PORT = Number(process.env.PORT) || 8080;
const INTERVAL = Number(process.env.INTERVAL) || 100;

// Create Server instance
const server = new Server();

/**
 * Listener function on Server start
 * @returns {void}
 */
const listeningListener = () => {
  print(`Listen to port ${PORT}`);
};

// Handle request
server.on("request", (request, response) => {
  handler(request, response, INTERVAL);

  /**
   * This is will be;
   * ```
   * [11:25:05] GET 200 /parrot
   * ```
   */
  print(`${request.method} ${response.statusCode} ${request.url}`);
});

/**
 * Timeout store for restart
 * @type {import("node:timers").Timeout}
 */
let restartTimeout;

// Handle error
server.on("error", (error) => {
  // When the address is used (`EADDRINUSE`), try to restart the server
  if (error.code === "EADDRINUSE") {
    print("Address in use, retrying in 5s...", "err");

    restartTimeout = setTimeout(() => {
      clearTimeout(restartTimeout);
      server.listen(PORT, listeningListener);
    }, 5000);
    return;
  }

  // Throw other errors
  throw error;
});

// Listen to the server
server.listen(PORT, listeningListener);
