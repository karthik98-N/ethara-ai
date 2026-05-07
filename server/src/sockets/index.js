import { Server } from "socket.io";

export function registerSockets(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }
  });

  io.on("connection", (socket) => {
    socket.on("project:join", (projectId) => socket.join(projectId));
    socket.on("comment:typing", ({ projectId, user }) => {
      socket.to(projectId).emit("comment:typing", { user });
    });
    socket.on("activity:new", ({ projectId, activity }) => {
      socket.to(projectId).emit("activity:new", activity);
    });
  });

  return io;
}
