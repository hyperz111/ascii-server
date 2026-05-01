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

// Listen to the server
server.listen(PORT, listeningListener);
