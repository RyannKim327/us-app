import { WebSocket } from "@fastify/websocket";
import { data_structure, json_data } from "ormyx/dist/interface";
import { jsonParser } from "./utils;

export default function SocketControl(socket: WebSocket, db: data_structure | json_data) {
  socket.on("message", (msg: string) => {
    const data = jsonParser(msg)
  })
}
