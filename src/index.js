import { Server } from "node:http";
import handler from "./handler.js";
import { print } from "./utils.js";

const PORT = Number(process.env.PORT) || 8080;
const INTERVAL = Number(process.env.INTERVAL) || 100;

const server = new Server();
const listeningListener = () => {
  print(`Listen to port ${PORT}`);
};

server.on("request", (request, response) => {
  handler(request, response, INTERVAL);

  print(`${request.method} ${response.statusCode} ${request.url}`);
});

let restartTimeout;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    print("Address in use, retrying...", "err");

    restartTimeout = setTimeout(() => {
      clearTimeout(restartTimeout);
      server.listen(PORT, listeningListener);
    }, 5000);
  }

  throw error;
});

server.listen(PORT, listeningListener);
