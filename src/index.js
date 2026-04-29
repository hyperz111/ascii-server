import { Server } from "node:http";
import handler from "./handler.js";
import { print } from "./utils.js";

const PORT = Number(process.env.PORT) || 8080;
const INTERVAL = Number(process.env.INTERVAL) || 100;

const server = new Server();

server.on("request", (request, response) => {
  handler(request, response, INTERVAL);

  print(`${request.method} ${response.statusCode} ${request.url}`);
});

server.listen(PORT, () => {
  print(`Listen to port ${PORT}`);
});
