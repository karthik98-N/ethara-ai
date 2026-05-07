import "dotenv/config";
import http from "http";
import app from "./app.js";
import { registerSockets } from "./sockets/index.js";

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = registerSockets(server);
app.set("io", io);

server.listen(port, () => {
  console.log(`FlowForge API running on port ${port}`);
});
