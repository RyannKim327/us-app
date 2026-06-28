import { WebSocket } from "@fastify/websocket";
import { jsonParser } from "./utils";

export default function SocketControl(socket: WebSocket, db: unknown) {
  socket.on("message", (msg: string) => {
    const data = jsonParser(msg)
  })
}
